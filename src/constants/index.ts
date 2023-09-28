import { ChainId } from "useink/chains"
import { NetWork } from "../types"

const SUPPORTED_NETWORKS: Array<NetWork> = [
    {
        chain_id: 'phala',
        name: "Phala",
        logo_url: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3877871014-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FmFxKaTU233OXZzSqmqjx%252Ficon%252Fw6VUF2jwzKDT8CamIkiA%252FPhala_Icon%2520Only_grn.png%3Falt%3Dmedia%26token%3Dc6cc4861-b086-4051-a56c-773ab447f4e8',
        currency: 'PHA'
    },
    {
        chain_id: 'phala-testnet',
        name: "Phala Testnet (Poc 5)",
        logo_url: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3877871014-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FmFxKaTU233OXZzSqmqjx%252Ficon%252Fw6VUF2jwzKDT8CamIkiA%252FPhala_Icon%2520Only_grn.png%3Falt%3Dmedia%26token%3Dc6cc4861-b086-4051-a56c-773ab447f4e8',
        currency: 'PHA'
    },
    {
        chain_id: 'aleph',
        name: "Aleph Zero",
        logo_url: '',
        currency: 'PHA'
    },
    {
        chain_id: 'aleph-testnet',
        name: "Aleph Zero Testnet",
        logo_url: '',
        currency: 'PHA'
    },
]



export {SUPPORTED_NETWORKS}