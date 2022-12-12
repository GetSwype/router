import { Token, Quote, Fee, ethers, BigNumber, Transaction, AlphaRouter, CurrencyAmount, BigintIsh, Percent, UniswapToken, TradeType } from "../types";
import { Ethereum, Polygon, Optimism, Arbitrum } from "../blockchains";
import { Dex, Blockchain } from "../core";
import axios, { AxiosResponse } from "axios";

export class OneInch extends Dex {
    constructor() {
        super(
            "1inch",
            [ Ethereum.get_instance(), Polygon.get_instance(), Arbitrum.get_instance(), Optimism.get_instance() ],
            [ TradeType.EXACT_INPUT ],
            "https://api.1inch.io/v5.0/",
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
        if (to_token_amount) {
            throw new Error("1inch only supports exact input trades")
        }
        // If the token is eth, 1inch uses a weird address to denominate it
        if (from_token && from_token.type == 2) { from_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }
        if (to_token && to_token.type == 2) { to_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }

        let fromTokenAddress = from_token.address
        let toTokenAddress = to_token.address
        let amount = from_token_amount.toString()
        let fromAddress =  from
        slippage = slippage || 0.5
        let disableEstimate = true

        let route: AxiosResponse<any>,
            quote: AxiosResponse<any>,
            native_token: Token,
            nonce: number;

        try {
            [ quote, route, native_token, nonce ] = await Promise.all([
                axios.get(this.url!+chain.chain_id+"/quote?"+new URLSearchParams({
                    fromTokenAddress,
                    toTokenAddress,
                    amount,
                }),
                    {
                        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
                    }
                ),
                axios.get(this.url!+chain.chain_id+"/swap?"+new URLSearchParams({
                    fromTokenAddress,
                    toTokenAddress,
                    amount,
                    fromAddress,
                    slippage: `${slippage}`,
                    disableEstimate: `${disableEstimate}`,
                }),
                    {
                        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
                    }
                ),
                chain.native_token(),
                chain.client.eth.getTransactionCount(from)
            ])
        }catch(error) {
            throw new Error("1inch API error")
        }

        let quote_data = await quote.data
        let route_data = await route.data

        let quote_ = new Quote(
            route_data.fromTokenAmount,
            route_data.toTokenAmount,
            chain,
            new Fee(
                route_data.tx.gasPrice,
                quote_data.estimatedGas,
                native_token
            ),
            {
                from,
                to: route_data.tx.to,
                data: route_data.tx.data,
                nonce,
                gasPrice: route_data.gasPrice,
                gasLimit: quote_data.estimatedGas,
            } as Transaction,
            "1inch"
        )
        return quote_
    }
}