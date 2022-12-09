export interface Blockchain {
    name: string;
    chain_id: number;
    twc_id: number;
    rpc_url: string;
    explorer_url: string;
}

export const Ethereum: Blockchain = {
    name: "Ethereum",
    chain_id: 1,
    twc_id: 60,
    rpc_url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    explorer_url: "https://etherscan.io"
}