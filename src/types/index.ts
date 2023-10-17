import { ChainId } from "useink/chains"
import { ContentsResponse } from "./response";
import { type } from "os";

type TokenMetadata = {
    name: string,
    description: string,
    avt: string,
    media: string,
}


type NetWork = {
    chain_id: ChainId,
    name: string,
    logo_url: string,
    currency: string,
    contract_address: string,
    decimals: number
}

type ContentId = string;

type Content = {
    contentId: number,
    author: string,
    name: string,
    avt: string,
    media: string,
    description: string,
    payment: Payment,
}

type Payment = {
    option1: PaymentOption | null,
    option2: PaymentOption | null,
    option3: PaymentOption | null,
}

type PaymentOption = {
    days: number | undefined | string,
    price: number | undefined | string,
}

export enum Star {
    One,
    Two,
    Three,
    Four,
    Five,
}

type License = {
    contentId: number,
    licenseId: number,
    user: string,
    startDate: string,
    endDate: string,
    review: {
        detail: string,
        star: Star
    }
}

export type {NetWork, Content, ContentId, ContentsResponse, TokenMetadata, License, PaymentOption, Payment}