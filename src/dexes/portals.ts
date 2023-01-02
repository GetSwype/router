import { BigintIsh, TradeType } from "@uniswap/sdk-core";
import axios, { AxiosResponse } from "axios";
import { Arbitrum, Ethereum, Optimism, Polygon } from "../blockchains";
import { Blockchain, Dex } from "../core";
import { BigNumber, Fee, Quote, Token } from "../types";

export class Portals extends Dex {
    constructor() {
        super(
            "Portals",
            [ Ethereum.get_instance(), Optimism.get_instance(), Polygon.get_instance(), Arbitrum.get_instance() ],
            [ TradeType.EXACT_INPUT ],
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
        if (to_token_amount) {
            throw new Error("Portals only supports exact input trades")
        }

        // If type is eth, Portals uses a weird address to denominate it
        if (from_token.type == 2) { from_token.address = "0x0000000000000000000000000000000000000000" }
        if (to_token.type == 2) { to_token.address = "0x0000000000000000000000000000000000000000" }

        let sellToken = from_token.address;
        let buyToken = to_token.address;
        let sellAmount = from_token_amount.toString();
        slippage = slippage ? slippage : 0.005;

        let route: AxiosResponse<any>,
            transaction: AxiosResponse<any>,
            transaction_with_gas: AxiosResponse<any>,
            native_token: Token,
            nonce: number,
            gas_price: string;
        
        try {
            [ route, transaction, transaction_with_gas, native_token, nonce, gas_price ] = await Promise.all([
                axios.get(this.url!+chain.name.toLowerCase()+`/estimate?`+new URLSearchParams({
                    sellToken,
                    buyToken,
                    sellAmount,
                    slippagePercentage: `${slippage}`,
                })),
                axios.get(this.url!+chain.name.toLowerCase()+`?`+new URLSearchParams({
                    sellToken,
                    buyToken,
                    sellAmount,
                    slippagePercentage: `${slippage}`,
                    validate: "false",
                    takerAddress: from
                })),
                axios.get(this.url!+chain.name.toLowerCase()+`?`+new URLSearchParams({
                    sellToken,
                    buyToken,
                    sellAmount,
                    slippagePercentage: `${slippage}`,
                    validate: "true",
                    takerAddress: "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5"
                })),
                chain.native_token(),
                chain.client.eth.getTransactionCount(from),
                chain.client.eth.getGasPrice()
            ]);
        } catch (error) {
            console.log(error)
            throw new Error("Portals API error")
        }

        let transaction_data = transaction.data
        let route_data = route.data
        let transaction_with_gas_data = transaction_with_gas.data

        let quote = new Quote(
            from_token_amount,
            route_data.buyAmount,
            chain,
            new Fee(
                gas_price,
                transaction_with_gas_data.context.gasLimit,
                native_token
            ),
            {
                from,
                to: transaction_data.tx.to,
                value: from_token.type == 2 ? BigNumber.from(from_token_amount) : BigNumber.from(0),
                data: transaction_data.tx.data,
                nonce,
                gasPrice: BigNumber.from(gas_price),
                gasLimit: BigNumber.from(transaction_with_gas_data.context.gasLimit),
                chainId: chain.chain_id
            },
            "Portals"
        )
        return quote
    }
}