import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export class Arbitrum extends Blockchain {
    private static instance: Arbitrum;
    private constructor() {
        super(
            "Arbitrum",
            42161,
            10042221,
            "https://rpc.ankr.com/arbitrum",
            "https://arbiscan.io/tx/"
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
}