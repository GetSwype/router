import { Token, Quote, BigintIsh, TradeType } from "../types";
import { Dex } from "./dex";
import { BlockchainFactory } from "./blockchain_factory";


export class Aggregator {
    dexes: Dex[];
    constructor(
        dexes: Dex[],
    ) {
        this.dexes = dexes;
    }

    async quote(
        from: string,
        from_token: Token,
        to_token: Token,
        chain_id: number,
        from_token_amount?: BigintIsh,
        to_token_amount?: BigintIsh,
        slippage?: number,
    ): Promise<Quote> {
        let quotes: Quote[] = [];
        let quote_requests = [];
        let trade_type: TradeType = from_token_amount ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;
        let chain = BlockchainFactory(chain_id);
        for (let dex of this.dexes) {
            if (dex.supported_chains.includes(chain) && dex.supported_trade_types.includes(trade_type)) {
                console.log("INCLUDING DEX: " + dex.name)
                quote_requests.push(
                    withTimeout(15000, dex.quote(from, from_token, to_token, chain, from_token_amount, to_token_amount, slippage))
                );
            }
        }

        let quote_requests_settled = await Promise.allSettled(quote_requests);
        for (let quote_request of quote_requests_settled) {
            if (quote_request.status == "fulfilled") {
                quotes.push(quote_request.value);
            }
        }

        if (quotes.length == 0) {
            throw new Error(`Could not find a quote across all DEXes`);
        }
        
        switch (trade_type) {
            case TradeType.EXACT_INPUT: {
                let best_quote = quotes[0];
                for (let quote of quotes) {
                    console.info(`${quote.dex} quote gives: ${quote.to_token_amount} for ${quote.from_token_amount}`)
                    if (quote.to_token_amount > best_quote.to_token_amount) {
                        best_quote = quote;
                    }
                }
                return best_quote;
            }
            case TradeType.EXACT_OUTPUT: {
                let best_quote = quotes[0];
                for (let quote of quotes) {
                    console.info(`${quote.dex} quote requires: ${quote.from_token_amount} for ${quote.to_token_amount}`)
                    if (quote.from_token_amount < best_quote.from_token_amount) {
                        best_quote = quote;
                    }
                }
                return best_quote;
            }
        }
    }
}

const withTimeout = (millis, promise) => {
    const timeout = new Promise((resolve, reject) =>
        setTimeout(
            () => reject(`Timed out after ${millis} ms.`),
            millis));
    return Promise.race([
        promise,
        timeout
    ]);
};