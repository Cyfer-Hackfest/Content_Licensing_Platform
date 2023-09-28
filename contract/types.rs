use ink::primitives::AccountId;
use ink::prelude::string::String;

pub type ContentId = u64;
pub type LicenseId = u64;
pub type Balance = u128; 
pub type Timestamp = u64; 
pub type Hash = [u8; 32]; 
pub type BlockNumber = u32; 


pub struct MyEnvironment;

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct PaymentOption {
    days: u32,
    price: Balance,
}

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Payment {
    option_1: PaymentOption,
    option_2: PaymentOption,
    option_3: PaymentOption,
}

// #[ink::storage_item]
#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Content {
    pub creator: AccountId,
    pub avt: String,
    pub payment: Payment,
}

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub enum Star {
    One,
    Two,
    Three,
    Four,
    Five,
}

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Review {
    pub detail: String,
    pub star: Star,
}

// #[ink::storage_item]
#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct License {
    content_id: ContentId,
    user: AccountId,
    start_date: Timestamp,
    end_date: Timestamp,
    review: Review,
}
