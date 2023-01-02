import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export class Optimism extends Blockchain {
    private static instance: Optimism;
    private constructor() {
        super(
            "Optimism",
            10,
            process.env.OPTIMISM_NODE || "https://mainnet.optimism.io",
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

    usdc_token(): Token {
        return {
            address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
            decimals: 6,
            chain_id: this.chain_id,
            type: 0
        }
    }

    wrapped_native_token(): Token {
        return {
            address: "0x4200000000000000000000000000000000000006",
            decimals: 18,
            chain_id: this.chain_id,
            type: 0
        }
    }
}