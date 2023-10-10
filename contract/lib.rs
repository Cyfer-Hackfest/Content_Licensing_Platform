#![cfg_attr(not(feature = "std"), no_std, no_main)]
mod types;

use crate::types::*;
use ink::primitives::AccountId;

impl ink::env::Environment for MyEnvironment {
    const MAX_EVENT_TOPICS: usize = 3;
    type AccountId = AccountId;
    type Balance = Balance;
    type Hash = Hash;
    type Timestamp = Timestamp;
    type BlockNumber = BlockNumber;
    type ChainExtension = ink::env::NoChainExtension;
}

#[ink::contract(env = MyEnvironment)]
mod usage_license_contract {
    use crate::types::*;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Default)]
    #[ink(storage)]
    pub struct UsageLicenseContract {
        contents: Mapping<ContentId, Content>,
        licenses: Mapping<LicenseId, License>,

        content_to_licenses: Mapping<ContentId, Vec<LicenseId>>,
        creator_to_contents: Mapping<AccountId, Vec<ContentId>>,
        creator_to_licenses: Mapping<AccountId, Vec<LicenseId>>,

        content_id_nonce: ContentId,
        license_id_nonce: LicenseId,
    }

    #[ink::trait_definition]
    pub trait ContentCore {
        #[ink(message)]
        fn create_content(
            &mut self,
            name: String,
            avt: String,
            description: String,
            media: String,
            payment: Payment,
        ) -> Result<ContentId, Error>;

        #[ink(message)]
        fn update_payment(
            &mut self,
            content_id: ContentId,
            payment: Payment,
        ) -> Result<ContentId, Error>;

        #[ink(message)]
        fn get_contents(&self) -> Result<Vec<Content>, Error>;

        #[ink(message)]
        fn get_creator_contents(&self, author: AccountId) -> Result<Vec<Content>, Error>;
    }

    #[ink::trait_definition]
    pub trait LicenseCore {
        #[ink(message, payable)]
        fn buy_usage_license(&mut self,content_id: ContentId, option: PaymentOptionRequest,) -> Result<LicenseId, Error>;

        #[ink(message, payable)]
        fn extend_usage_time(&mut self,  license_id: LicenseId, option: PaymentOptionRequest) -> Result<LicenseId, Error>;

        // #[ink(message)]
        // fn change_license_user(&mut self, license_id: LicenseId, new_user: AccountId) -> Result<LicenseId, Error>;

        #[ink(message)]
        fn get_user_licenses(&self, user: AccountId) -> Result<Vec<License>, Error>;

        #[ink(message)]
        fn get_licenses(&self, content_id: ContentId) -> Result<Vec<License>, Error>;
    }

    #[ink(event)]
    pub struct NewContentCreated {}

    #[ink(event)]
    pub struct ContentPaymentUpdated {}

    #[ink(event)]
    pub struct ContentUsageLicenseBought {}

    #[ink(event)]
    pub struct UsageTimeExtended {}

    #[ink(event)]
    pub struct LicenseUsagePermissionTransferred {}

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        WrongContentId,
        WrongLicenseId,
        NotOwner,
        InvalidPaymentOption,
        InvalidTransferValue
    }

    impl UsageLicenseContract {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {
                contents: Mapping::new(),
                licenses: Mapping::new(),
                content_to_licenses: Mapping::new(),
                creator_to_contents: Mapping::new(),
                creator_to_licenses: Mapping::new(),
                content_id_nonce: 0,
                license_id_nonce: 0,
            }
        }
    }

    impl LicenseCore for UsageLicenseContract {
        #[ink(message, payable)]
        fn buy_usage_license(
            &mut self,
            content_id: ContentId,
            option: PaymentOptionRequest,
        ) -> Result<LicenseId, Error> {
            let caller = self.env().caller();

            let content = self.get_content_by_id(content_id)?;
            let payment = content.payment;

            let mut op = None;
            match option {
                PaymentOptionRequest::Option1 => op = payment.option_1,
                PaymentOptionRequest::Option2 => op = payment.option_2,
                PaymentOptionRequest::Option3 => op = payment.option_3,
            }

            match op {
                Some(detail) => {
                    if self.env().transferred_value() < detail.price {
                        return Err(Error::InvalidTransferValue);
                    }

                    let license_id = self.get_license_id_nonce();
                    self.increase_license_id_nonce();

                    let current_time = self.env().block_timestamp();
                    let duration = detail.days as u64 * 86400000; // 86 400 000 = 24 * 60 * 60 * 1000 (miliseconds)
                    
                    let new_license = License {
                        license_id,
                        content_id,
                        user: caller,
                        start_date: current_time,
                        end_date: current_time + duration as u64,
                        review: None,
                    };

                    let _ = self
                        .env()
                        .transfer(content.author, self.env().transferred_value());

                    self.licenses.insert(license_id, &new_license);
                    self.add_content_licenses(content_id, license_id);
                    self.add_creator_licenses(caller, license_id);

                    Ok(license_id)
                }
                None => return Err(Error::InvalidPaymentOption),
            }
        }

        #[ink(message, payable)]
        fn extend_usage_time(&mut self,
            license_id: LicenseId,
            option: PaymentOptionRequest,
        ) -> Result<LicenseId, Error> {
            let caller = self.env().caller();
            let mut current_license = self.get_license_by_id(license_id)?;

            if caller != current_license.user {
                return Err(Error::NotOwner);
            }

            let content = self.get_content_by_id(current_license.content_id)?;
            let payment = content.payment;

            let mut op = None;
            match option {
                PaymentOptionRequest::Option1 => op = payment.option_1,
                PaymentOptionRequest::Option2 => op = payment.option_2,
                PaymentOptionRequest::Option3 => op = payment.option_3,
            }

            match op {
                Some(detail) => {
                    if self.env().transferred_value() < detail.price {
                        return Err(Error::InvalidTransferValue);
                    }

                    let new_duration = detail.days * 86400000;
                    current_license.end_date += new_duration as u64;

                    let _ = self
                        .env()
                        .transfer(content.author, self.env().transferred_value());
                    self.licenses.insert(license_id, &current_license);

                    Ok(license_id)
                }
                None => return Err(Error::InvalidPaymentOption),
            }
        }

        // #[ink(message)]
        // fn change_license_user(&mut self, license_id: LicenseId, new_user: AccountId) -> Result<LicenseId, Error> {}

        #[ink(message)]
        fn get_user_licenses(&self, user: AccountId) -> Result<Vec<License>, Error> {
            let mut licenses = Vec::new();
            let license_id_nonce = self.get_license_id_nonce();

            for license_id in 0..license_id_nonce {
                let license = self.get_license_by_id(license_id)?;

                if license.user == user {
                    licenses.push(license);
                }
            }

            Ok(licenses)
        }

        #[ink(message)]
        fn get_licenses(&self, content_id: ContentId) -> Result<Vec<License>, Error> {
            let licence_ids = self
                .content_to_licenses
                .get(content_id)
                .unwrap_or(Vec::new());
            let mut licenses = Vec::new();

            for license_id in licence_ids {
                let license = self.get_license_by_id(license_id)?;
                licenses.push(license)
            }

            Ok(licenses)
        }
    }

    impl ContentCore for UsageLicenseContract {
        #[ink(message)]
        fn create_content(
            &mut self,
            name: String,
            avt: String,
            description: String,
            media: String,
            payment: Payment,
        ) -> Result<ContentId, Error> {
            let content_id = self.get_content_id_nonce();
            self.increase_content_id_nonce();

            let author = self.env().caller();

            let new_content = Content {
                name,
                avt,
                media,
                description,
                payment,
                author,
                content_id,
            };

            self.contents.insert(content_id, &new_content);
            self.add_creator_contents(author, content_id);

            Ok(content_id)
        }

        #[ink(message)]
        fn update_payment(
            &mut self,
            content_id: ContentId,
            payment: Payment,
        ) -> Result<ContentId, Error> {
            let caller = self.env().caller();
            let content = self.get_content_by_id(content_id);

            match content {
                Ok(mut c) => {
                    if caller != c.author {
                        return Err(Error::NotOwner);
                    }

                    c.payment = payment;
                    self.contents.insert(content_id, &c);

                    Ok(content_id)
                }
                Err(e) => return Err(e),
            }
        }

        #[ink(message)]
        fn get_contents(&self) -> Result<Vec<Content>, Error> {
            let mut contents = Vec::new();
            let content_id_nonce = self.get_content_id_nonce();

            for content_id in 0..content_id_nonce {
                let content = self.get_content_by_id(content_id)?;
                contents.push(content)
            }

            Ok(contents)
        }

        #[ink(message)]
        fn get_creator_contents(&self, author: AccountId) -> Result<Vec<Content>, Error> {
            let mut contents = Vec::new();
            let content_id_nonce = self.get_content_id_nonce();

            for content_id in 0..content_id_nonce {
                let content = self.get_content_by_id(content_id)?;

                if content.author == author {
                    contents.push(content);
                }
            }

            Ok(contents)
        }
    }

    #[ink(impl)]
    impl UsageLicenseContract {
        fn get_content_by_id(&self, content_id: ContentId) -> Result<Content, Error> {
            if content_id < 0 || content_id >= self.get_content_id_nonce() {
                return Err(Error::WrongContentId);
            }
            Ok(self.contents.get(content_id).unwrap())
        }

        fn get_license_by_id(&self, license_id: LicenseId) -> Result<License, Error> {
            if license_id < 0 || license_id >= self.get_license_id_nonce() {
                return Err(Error::WrongLicenseId);
            }
            Ok(self.licenses.get(license_id).unwrap())
        }

        fn get_content_id_nonce(&self) -> ContentId {
            self.content_id_nonce
        }

        fn get_license_id_nonce(&self) -> LicenseId {
            self.license_id_nonce
        }

        fn increase_content_id_nonce(&mut self) {
            self.content_id_nonce += 1;
        }

        fn increase_license_id_nonce(&mut self) {
            self.license_id_nonce += 1;
        }

        fn add_creator_contents(&mut self, author: AccountId, content_id: ContentId) {
            let mut creator_contents = self.creator_to_contents.get(author).unwrap_or(Vec::new());
            creator_contents.push(content_id);
            self.creator_to_contents.insert(author, &creator_contents);
        }

        fn add_creator_licenses(&mut self, author: AccountId, license_id: LicenseId) {
            let mut creator_licenses = self.creator_to_licenses.get(author).unwrap_or(Vec::new());
            creator_licenses.push(license_id);
            self.creator_to_licenses.insert(author, &creator_licenses);
        }

        fn add_content_licenses(&mut self, content_id: ContentId, license_id: LicenseId) {
            let mut content_licenses = self
                .content_to_licenses
                .get(content_id)
                .unwrap_or(Vec::new());
            content_licenses.push(license_id);
            self.content_to_licenses
                .insert(content_id, &content_licenses);
        }
    }
}
