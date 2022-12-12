import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export class Arbitrum extends Blockchain {
    private static instance: Arbitrum;
    private constructor() {
        super(
            "Arbitrum",
            42161,
            process.env.ARBITRUM_RPC || "https://rpc.ankr.com/arbitrum",
        )
    }

    public static get_instance(): Arbitrum {
        if (!Arbitrum.instance) {
            Arbitrum.instance = new Arbitrum();
        }
        return Arbitrum.instance;
    }

    async native_token(): Promise<Token> {
        let price = await latest_eth_price();
        return {
            address: "0x0000000000000000000000000000000000000000",
            decimals: 18,
            price,
            chain_id: this.chain_id,
            type: 2
        }
    }

    usdc_token(): Token {
        return {
            address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
            decimals: 6,
            chain_id: this.chain_id,
            type: 0
        }
    }

    weth_token(): Token {
        return {
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            decimals: 18,
            chain_id: this.chain_id,
            type: 0
        }
    }
}