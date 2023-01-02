import { Blockchain } from "../core/blockchain";
import { latest_avalanche_price } from "../core/price";
import { Token } from "../types/token";

export class Avalanche extends Blockchain {
    private static instance: Avalanche;
    private constructor() {
        super(
            "Avalanche",
            43114,
            process.env.AVALANCHE_NODE || "https://1rpc.io/avax/c",
        )
    }

    public static get_instance(): Avalanche {
        if (!Avalanche.instance) {
            Avalanche.instance = new Avalanche();
        }
        return Avalanche.instance;
    }

    async native_token(): Promise<Token> {
        let price = await latest_avalanche_price();
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
            address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            decimals: 6,
            chain_id: this.chain_id,
            type: 0
        }
    }

    wrapped_native_token(): Token {
        return {
            address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            decimals: 18,
            chain_id: this.chain_id,
            type: 0
        }
    }
}