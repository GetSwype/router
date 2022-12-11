import { BigintIsh } from "@uniswap/sdk-core";
import { Transaction } from "ethers";
import { Blockchain } from "../core/blockchain";
import Fee from "./fee";


/**
 * The default quote class that is returned by the DEX class when asking for a quote with calldata
 */
export default class Quote {
    from_token_amount: BigintIsh;
    to_token_amount: BigintIsh;
    chain: Blockchain;
    fee: Fee;
    transaction: Transaction;

    constructor(
        from_token_amount: BigintIsh,
        to_token_amount: BigintIsh,
        chain: Blockchain,
        fee: Fee,
        transaction: Transaction,
    ) {
        this.from_token_amount = from_token_amount;
        this.to_token_amount = to_token_amount;
        this.chain = chain;
        this.fee = fee;
        this.transaction = transaction;
    }
}