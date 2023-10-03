import { ChainId } from "useink/chains"
import { ContentsResponse } from "./response";
import { type } from "os";

type TokenMetadata = {
    title: string,
    description: string,
    avt: string,
    media: string
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
    author: string,
    name: string,
    avt: string,
    description: string,
    payment: {}
}

export type {NetWork, Content, ContentId, ContentsResponse, TokenMetadata}