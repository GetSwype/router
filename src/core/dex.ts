import { BigNumberish } from "@ethersproject/bignumber";
import { Blockchain } from "./blockchain";
import { Quote } from "../types/quote";
import { UnsignedTransaction } from "../types/transaction";
import { Token } from "../types/token";
import { BigintIsh } from "@uniswap/sdk-core";

export abstract class Dex {
    name: string;
    supported_chains: [Blockchain];
    url?: string | null | undefined;
    api_key?: string | null | undefined;
    
    constructor(
        name: string,
        supported_chains: [Blockchain],
        url?: string,
        api_key?: string,
    ) {
        this.name = name;
        this.supported_chains = supported_chains;
        this.url = url;
        this.api_key = api_key;
    }

    abstract quote(
        from_token: Token,
        to_token: Token,
        chain: Blockchain,
        from_token_amount?: BigintIsh,
        to_token_amount?: BigintIsh,
        slippage?: number,
    ): Promise<Quote>;

    abstract swap(
        from_token: Token,
        to_token: Token,
        chain: Blockchain,
        from_token_amount?: BigintIsh,
        to_token_amount?: BigintIsh,
        slippage?: number,
    ): Promise <UnsignedTransaction>;
}