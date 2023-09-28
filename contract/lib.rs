#![cfg_attr(not(feature = "std"), no_std, no_main)]
mod types;

use ink::primitives::AccountId;
use crate::types::*;

impl ink::env::Environment for MyEnvironment {
    const MAX_EVENT_TOPICS: usize = 3;
    // type AccountId = [u8; 16];
    type AccountId = AccountId;
    type Balance = Balance;
    type Hash = Hash;
    type Timestamp = Timestamp;
    type BlockNumber = BlockNumber;
    type ChainExtension = ::ink::env::NoChainExtension;
}

#[ink::contract(env = MyEnvironment)]
mod usage_license_contract {
    use ink::prelude::vec::Vec;
    use crate::types::*;
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
        fn create_content(&mut self);

        #[ink(message)]
        fn update_payment(&mut self);
        
        #[ink(message)]
        fn get_contents(&self);
        
        #[ink(message)]
        fn get_creator_contents(&self);
        
    }

    #[ink::trait_definition]
    pub trait LicenseCore {
        #[ink(message)]
        fn buy_usage_license(&mut self);

        #[ink(message)]
        fn extend_usage_time(&mut self);
        
        #[ink(message)]
        fn change_license_user(&mut self);

        #[ink(message)]
        fn get_user_licenses(&self);
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
        #[ink(message)]
        fn buy_usage_license(&mut self) {}

        #[ink(message)]
        fn extend_usage_time(&mut self) {}
        
        #[ink(message)]
        fn change_license_user(&mut self) {}


        #[ink(message)]
        fn get_user_licenses(&self) {}
    }

    impl ContentCore for UsageLicenseContract {
        #[ink(message)]
        fn create_content(&mut self) {}

        #[ink(message)]
        fn update_payment(&mut self) {}

        #[ink(message)]
        fn get_contents(&self) {}

        #[ink(message)]
        fn get_creator_contents(&self) {}
    }

    #[ink(impl)]
    impl UsageLicenseContract {
        fn get_content_licenses(&self) {}

        fn get_content_by_id(&self) {}

        fn get_license_by_id(&self) {}

        fn get_content_id_nonce(&self) {}

        fn get_license_id_nonce(&self) {}

        fn increase_content_id_nonce(&mut self) {}

        fn increase_license_id_nonce(&mut self) {}
    }
}
