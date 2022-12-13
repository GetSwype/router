import Web3 from "web3";
import { Token } from "../types/token";

export abstract class Blockchain {
    name: string;
    chain_id: number;
    rpc_url: string;
    client: Web3;

    constructor(
        name: string,
        chain_id: number,
        rpc_url: string,
    ) {
        this.name = name;
        this.chain_id = chain_id;
        this.rpc_url = rpc_url;
        this.client = new Web3(rpc_url)
    }

    abstract native_token(): Promise<Token>;
    abstract usdc_token(): Token;
    abstract wrapped_native_token(): Token;
}