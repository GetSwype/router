import { BigintIsh } from "@uniswap/sdk-core";
import Ethereum from "../blockchains/ethereum";
import { Blockchain } from "../core/blockchain";
import { Dex } from "../core/dex";
import { Token } from "../types";
import Quote from "../types/quote";

export default class Paraswap extends Dex {
    constructor() {
        super(
            "Paraswap",
            [ Ethereum.get_instance() ],
            ["Swap"],
            "https://paraswap.io/",
            "https://api.paraswap.io/v2/"
        );
    }

    async quote(
        from: string,
        from_token: Token,
        to_token: Token,
        chain: Blockchain,
        from_token_amount?: BigintIsh,
        to_token_amount?: BigintIsh,
        slippage?: number,
    ): Promise<Quote> {

    }
}