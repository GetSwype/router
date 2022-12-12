import { BigintIsh, TradeType } from "@uniswap/sdk-core"
import axios from "axios"
import { Transaction } from "ethers"
import Arbitrum from "../blockchains/arbitrum"
import Ethereum from "../blockchains/ethereum"
import Optimism from "../blockchains/optimism"
import Polygon from "../blockchains/polygon"
import { Blockchain } from "../core/blockchain"
import { Dex } from "../core/dex"
import { Token } from "../types"
import Fee from "../types/fee"
import Quote from "../types/quote"

export default class OneInch extends Dex {
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

        let [ quote, route, native_token, nonce ] = await Promise.all([
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
        
        if (quote.status != 200) {
            throw new Error("1inch quote failed")
        }
        if (route.status != 200) {
            throw new Error("1inch route failed")
        }

        let quote_data = await quote.data
        let route_data = await route.data

        console.log("Quote: ", quote_data)
        console.log("Route: ", route_data)

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