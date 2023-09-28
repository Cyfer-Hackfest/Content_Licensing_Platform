import { ChainId } from "useink/chains"

type NetWork = {
    chain_id: ChainId,
    name: string,
    logo_url: string,
    currency: string
}

export type {NetWork}