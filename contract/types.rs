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
    pub days: u32,
    pub price: Balance,
}

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Payment {
    pub option_1: Option<PaymentOption>,
    pub option_2: Option<PaymentOption>,
    pub option_3: Option<PaymentOption>,
}

#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub enum PaymentOptionRequest {
    Option1,
    Option2,
    Option3,
}

// #[ink::storage_item]
#[derive(scale::Decode, scale::Encode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Content {
    pub content_id: ContentId,
    pub author: AccountId,
    pub name: String,
    pub avt: String,
    pub media: String,
    pub description: String,
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
    pub content_id: ContentId,
    pub license_id: LicenseId,
    pub user: AccountId,
    pub start_date: Timestamp,
    pub end_date: Timestamp,
    pub review: Option<Review>,
}
