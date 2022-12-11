import { Blockchain, Ethereum } from "../core/blockchain";
import { Dex } from "../core/dex";
import Quote from "../types/quote";
import { UnsignedTransaction } from "../types/transaction";
import { AlphaRouter, CurrencyAmount } from '@uniswap/smart-order-router'
import { ethers } from "ethers";
import { Token } from "../types/token";
import { BigintIsh, Percent, Token as UniswapToken, TradeType } from "@uniswap/sdk-core";
import Fee from "../types/fee";
import { EthereumToken } from "../core/price";


/**
 * The Uniswap DEX class
 */
export default class Uniswap extends Dex {
    router_mapping: { [key: string]: AlphaRouter } = {};
    constructor() {
        super(
            "Uniswap",
            [Ethereum],
            [TradeType.EXACT_INPUT, TradeType.EXACT_OUTPUT],
        )
        this.supported_chains.forEach(chain => {
            this.router_mapping[chain.name] = new AlphaRouter({ chainId: chain.chain_id, provider: new ethers.providers.JsonRpcProvider(chain.rpc_url) })
        })
    }

    async quote(
        from_token: Token, 
        to_token: Token, 
        chain: Blockchain, 
        from: string,
        from_token_amount?: BigintIsh, 
        to_token_amount?: BigintIsh, 
        slippage?: number
    ): Promise<Quote> {
        const router = this.router_mapping[chain.name];
        let from_token_uniswap = new UniswapToken(chain.chain_id, from_token.address, from_token.decimals, from_token.symbol, from_token.name);
        let to_token_uniswap = new UniswapToken(chain.chain_id, to_token.address, to_token.decimals, to_token.symbol, to_token.name);
        let trade_type = from_token_amount ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;
        let amount = from_token_amount ? CurrencyAmount.fromRawAmount(from_token_uniswap, from_token_amount) : CurrencyAmount.fromRawAmount(to_token_uniswap, to_token_amount);
        let [ route, ether_token ] = await Promise.all([
            await router.route(
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
            await EthereumToken()
        ])
        console.log(route.trade.out)
        let gas_used = route.estimatedGasUsed;
        let gas_price = route.gasPriceWei;
        let fee = new Fee(
            gas_used,
            gas_price,
            ether_token
        )
        return null
    }
}