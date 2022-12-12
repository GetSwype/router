import { BigintIsh, TradeType } from "@uniswap/sdk-core";
import axios from "axios";
import { Transaction } from "ethers";
import Arbitrum from "../blockchains/arbitrum";
import Ethereum from "../blockchains/ethereum";
import Optimism from "../blockchains/optimism";
import Polygon from "../blockchains/polygon";
import { Blockchain } from "../core/blockchain";
import { Dex } from "../core/dex";
import { Token } from "../types";
import Fee from "../types/fee";
import Quote from "../types/quote";

export default class Paraswap extends Dex {
    constructor() {
        super(
            "Paraswap",
            [ Ethereum.get_instance(), Polygon.get_instance(), Arbitrum.get_instance(), Optimism.get_instance() ],
            [ TradeType.EXACT_INPUT, TradeType.EXACT_OUTPUT ],
            "https://apiv5.paraswap.io/",
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

        // If the token is eth, paraswap uses a weird address to denominate it
        if (from_token && from_token.type == 2) { from_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }
        if (to_token && to_token.type == 2) { to_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }

        let srcToken = from_token.address
        let destToken = to_token.address
        let amount = (from_token_amount || to_token_amount).toString();
        let srcDecimals = from_token.decimals
        let destDecimals = to_token.decimals
        let side = from_token ? "SELL" : "BUY";
        let network = chain.chain_id;
        let userAddress = from;

        let params ={
            amount,
            destToken,
            srcToken,
            srcDecimals: `${srcDecimals}`,
            destDecimals: `${destDecimals}`,
            side,
            network: `${network}`,
            userAddress,
        }

        let [ route, native_token, nonce ] = await Promise.all([
            axios.get(this.url!+"prices?"+new URLSearchParams(params)),
            chain.native_token(),
            chain.client.eth.getTransactionCount(from),
        ]);

        if (route.status != 200) {
            throw new Error("Paraswap API returned an error");
        }
        let json: any = route.data;
        let priceRoute = json.priceRoute;
        console.log("Price Route: ", priceRoute);

        from_token_amount ??= priceRoute.srcAmount;
        to_token_amount ??= priceRoute.destAmount;

        params["priceRoute"] = priceRoute;
        let transaction_params = {
            srcToken,
            destToken,
            srcDecimals: `${srcDecimals}`,
            destDecimals: `${destDecimals}`,
            priceRoute,
            slippage: `${slippage ? slippage : 50}`,
            userAddress
        }
        if (from_token_amount) {
            transaction_params["srcAmount"] = amount;
        } else {
            transaction_params["destAmount"] = amount;
        }
        let transaction_request = await axios.post(this.url!+"transactions/"+chain.chain_id+"?ignoreChecks=true", transaction_params);

        if (transaction_request.status != 200) {
            throw new Error("Paraswap API returned an error");
        }
        let transaction_data: any = transaction_request.data;
        console.log("Transaction: ", transaction_data);

        let transaction = {
            to: transaction_data.to,
            from,
            nonce,
            gasLimit: priceRoute.gasCost,
            gasPrice: transaction_data.gasPrice,
            data: transaction_data.data,
            value: transaction_data.value,
            chainId: chain.chain_id,
        } as Transaction

        return new Quote(
            from_token_amount,
            to_token_amount,
            chain,
            new Fee(
                transaction_data.gasPrice,
                priceRoute.gasCost,
                native_token,
            ),
            transaction,
            this.name,
        )
    }
}