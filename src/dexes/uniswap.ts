import { Token, Quote, Fee, ethers, BigNumber, Transaction, AlphaRouter, CurrencyAmount, BigintIsh, Percent, UniswapToken, TradeType, SwapRoute } from "../types";
import { Ethereum, Polygon, Optimism, Arbitrum } from "../blockchains";
import { Dex, Blockchain } from "../core";


/**
 * The Uniswap DEX class
 */
export class Uniswap extends Dex {
    router_mapping: { [key: string]: AlphaRouter } = {};
    constructor() {
        super(
            "Uniswap",
            [ Ethereum.get_instance(), Polygon.get_instance(), Optimism.get_instance(), Arbitrum.get_instance() ],
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

        // ---------------------- Handle ETH ----------------------
        if (from_token && from_token.type == 2) {
            from_token.address = chain.wrapped_native_token().address;
        }
        if (to_token && to_token.type == 2) {
            to_token.address = chain.wrapped_native_token().address;
        }
        // ---------------------- Handle ETH ----------------------

        // Consturct the uniswap tokens
        let from_token_uniswap = new UniswapToken(chain.chain_id, from_token.address, from_token.decimals, "", "");
        let to_token_uniswap = new UniswapToken(chain.chain_id, to_token.address, to_token.decimals, "", "");

        // Get the trade type and amount. If theres a from token amount, that means its an exact input, otherwise its an output.
        let trade_type = from_token_amount ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;
        let amount = from_token_amount ? CurrencyAmount.fromRawAmount(from_token_uniswap, from_token_amount) : CurrencyAmount.fromRawAmount(to_token_uniswap, to_token_amount);

        let route: SwapRoute,
            native_token: Token,
            nonce: number,
            gas_price: string;

        try {
            // Get the route and native token
            [ route, native_token, nonce, gas_price ] = await Promise.all([
                router.route(
                    amount,
                    trade_type == TradeType.EXACT_INPUT ? to_token_uniswap : from_token_uniswap,
                    trade_type,
                    {
                        slippageTolerance: new Percent(slippage ? slippage : 1, 100),
                        recipient: from,
                        type: 1,
                        // Deadline in 30 mins
                        deadline: Math.floor(Date.now() / 1000) + (60 * 30),
                    }
                ),
                chain.native_token(),
                chain.client.eth.getTransactionCount(from),
                chain.client.eth.getGasPrice()
            ])
        } catch (e) {
            console.log(e)
            throw new Error(`Uniswap API error`)
        }

        from_token_amount ??= route.quote.numerator.toString();
        to_token_amount ??= route.quote.numerator.toString();

        // Get the gas used and gas price to build a fee object
        let gas_used = route.estimatedGasUsed;
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
            gasPrice: BigNumber.from(gas_price),
            data: route.methodParameters.calldata,
            value: from_token.type == 2 ? BigNumber.from(from_token_amount) : BigNumber.from(0),
            chainId: chain.chain_id,
        } as Transaction

        // Build the quote
        let quote = new Quote(
            from_token_amount,
            to_token_amount,
            chain,
            fee,
            transaction,
            this.name
        )
        return quote
    }
}