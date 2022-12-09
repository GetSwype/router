import { BigintIsh } from "@uniswap/sdk-core";
import { Blockchain } from "../core/blockchain";
import Fee from "./fee";
import { Token } from "./token";

export declare type Quote = {
    from_token: Token;
    to_token: Token;
    from_token_amount: BigintIsh;
    to_token_amount: BigintIsh;
    chain: Blockchain;
    fee: Fee;
};