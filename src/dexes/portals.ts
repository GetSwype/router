import { BigintIsh, TradeType } from "@uniswap/sdk-core";
import axios from "axios";
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
        let sellToken = from_token.address;
        let buyToken = to_token.address;
        let sellAmount = from_token_amount.toString();
        slippage = slippage ? slippage : 0.005;

        let [ route, transaction, transaction_with_gas, native_token, nonce, gas_price ] = await Promise.all([
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

        if (route.status != 200) {
            console.log(route.data)
            throw new Error(`Portals route failed ${route.data}`);
        }
        if (transaction.status != 200) {
            console.log(transaction.data)
            throw new Error(`Portals transaction failed ${transaction.data}`);
        }

        let transaction_data = transaction.data
        let route_data = route.data
        let transaction_with_gas_data = transaction_with_gas.data

        console.log("Route data: ", route_data)
        console.log("Transaction data: ", transaction_data)
        console.log("Transaction with gas data: ", transaction_with_gas_data)

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
                value: transaction_data.tx.value,
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