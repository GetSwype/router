import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export class Optimism extends Blockchain {
    private static instance: Optimism;
    private constructor() {
        super(
            "Optimism",
            10,
            1000700,
            "https://mainnet.optimism.io",
            "https://optimistic.etherscan.io/tx/"
        )
    }

    public static get_instance(): Optimism {
        if (!Optimism.instance) {
            Optimism.instance = new Optimism();
        }
        return Optimism.instance;
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
}