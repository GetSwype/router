import { BigintIsh } from "@uniswap/sdk-core";
import { Transaction } from "ethers";
import { Blockchain } from "../core/blockchain";
import Fee from "./fee";
import { Token } from "./token";


/**
 * The default quote class that is returned by the DEX class when asking for a quote with calldata
 */
export default class Quote {
    from_token: Token;
    to_token: Token;
    from_token_amount: BigintIsh;
    to_token_amount: BigintIsh;
    chain: Blockchain;
    fee: Fee;
    calldata: string;
    from: string;
    to: string;

    constructor(
        from_token: Token,
        to_token: Token,
        from_token_amount: BigintIsh,
        to_token_amount: BigintIsh,
        chain: Blockchain,
        fee: Fee,
        calldata: string,
        from: string,
        to: string,
    ) {
        this.from_token = from_token;
        this.to_token = to_token;
        this.from_token_amount = from_token_amount;
        this.to_token_amount = to_token_amount;
        this.chain = chain;
        this.fee = fee;
        this.calldata = calldata;
        this.from = from;
        this.to = to;
    }

    /**
     * Returns a web3js transaction format for signing and propagating directly to the blockchain
     */
    to_web3_transaction(nonce?: number): Transaction {
        return {
            nonce: nonce,
            gasLimit: this.fee.limit,
            gasPrice: this.fee.base_fee,
            to: this.to,
            from: this.from,
            data: this.calldata,
        }
    }
}