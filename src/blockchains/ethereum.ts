import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export class Ethereum extends Blockchain {
    private static instance: Ethereum;
    private constructor() {
        super(
            "Ethereum",
            1,
            process.env.ETHEREUM_RPC || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        )
    }

    public static get_instance(): Ethereum {
        if (!Ethereum.instance) {
            Ethereum.instance = new Ethereum();
        }
        return Ethereum.instance;
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
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            chain_id: this.chain_id,
            type: 0
        }
    }
}