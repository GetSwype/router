import { BigintIsh, TradeType } from "@uniswap/sdk-core";
import { Arbitrum, Ethereum, Optimism, Polygon } from "../blockchains";
import { Blockchain, Dex } from "../core";
import { Quote, Token } from "../types";

export class Portals extends Dex {
    constructor() {
        super(
            "Portals",
            [ Ethereum.get_instance(), Optimism.get_instance(), Polygon.get_instance(), Arbitrum.get_instance() ],
            [ TradeType.EXACT_INPUT, TradeType.EXACT_OUTPUT ],
            "https://api.portals.fi/v1/portal/"
        )
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