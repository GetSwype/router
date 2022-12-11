import { Blockchain } from "../core/blockchain";
import { Dex } from "../core/dex";
import Quote from "../types/quote";
import { AlphaRouter, CurrencyAmount } from '@uniswap/smart-order-router'
import { BigNumber, ethers, Transaction } from "ethers";
import { Token, TokenType } from "../types/token";
import { BigintIsh, Percent, Token as UniswapToken, TradeType } from "@uniswap/sdk-core";
import Fee from "../types/fee";
import Ethereum from "../blockchains/ethereum";


/**
 * The Uniswap DEX class
 */
export default class Uniswap extends Dex {
    router_mapping: { [key: string]: AlphaRouter } = {};
    constructor() {
        super(
            "Uniswap",
            [ Ethereum.get_instance() ],
            [TradeType.EXACT_INPUT, TradeType.EXACT_OUTPUT],
        )
        this.supported_chains.forEach(chain => {
            this.router_mapping[chain.name] = new AlphaRouter({ chainId: chain.chain_id, provider: new ethers.providers.JsonRpcProvider(chain.rpc_url) })
        })
    }

    async quote(
        from: string,
        from_token: Token, 
        to_token: Token, 
        chain: Blockchain, 
        from_token_amount?: BigintIsh, 
        to_token_amount?: BigintIsh, 
        slippage?: number
    ): Promise<Quote> {
        if (!this.supported_chains.includes(chain)) {
            throw new Error(`Chain ${chain.name} is not supported by ${this.name}`);
        }
        const router = this.router_mapping[chain.name];

        if (from_token && from_token.type == TokenType.NATIVE) { from_token.address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }
        if (to_token && to_token.type == TokenType.NATIVE) { to_token.address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }

        // Consturct the uniswap tokens
        let from_token_uniswap = new UniswapToken(chain.chain_id, from_token.address, from_token.decimals, from_token.symbol, from_token.name);
        let to_token_uniswap = new UniswapToken(chain.chain_id, to_token.address, to_token.decimals, to_token.symbol, to_token.name);

        // Get the trade type and amount. If theres a from token amount, that means its an exact input, otherwise its an output.
        let trade_type = from_token_amount ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;
        let amount = from_token_amount ? CurrencyAmount.fromRawAmount(from_token_uniswap, from_token_amount) : CurrencyAmount.fromRawAmount(to_token_uniswap, to_token_amount);

        // Get the route and native token
        let [ route, native_token, nonce ] = await Promise.all([
            router.route(
                amount,
                trade_type == TradeType.EXACT_INPUT ? to_token_uniswap : from_token_uniswap,
                trade_type,
                {
                    slippageTolerance: new Percent(slippage ? slippage : 1, 100),
                    recipient: from,
                    type: 0,
                    deadline: Math.floor(new Date().getTime() / 1000) + (60*60),
                }
            ),
            chain.native_token(),
            chain.client.eth.getTransactionCount(from)
        ])
        console.log("Trade route: ", route)
        console.log("Native token: ", native_token)
        console.log("Quote: ", route.quote.numerator.toString())

        from_token_amount ??= route.quote.numerator.toString();
        to_token_amount ??= route.quote.numerator.toString();

        // Get the gas used and gas price to build a fee object
        let gas_used = route.estimatedGasUsed;
        let gas_price = route.gasPriceWei;
        let fee = new Fee(
            gas_used,
            gas_price,
            native_token
        )
        let transaction = {
            to: route.methodParameters.to,
            from,
            nonce,
            gasLimit: gas_used,
            gasPrice: gas_price,
            data: route.methodParameters.calldata,
            value: BigNumber.from(route.methodParameters.value),
            chainId: chain.chain_id,
        } as Transaction
        
        console.log("Transaction: ", transaction)

        // Build the quote
        let quote = new Quote(
            from_token_amount,
            to_token_amount,
            chain,
            fee,
            transaction,
        )
        return quote
    }
}