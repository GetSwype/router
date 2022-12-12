import { Blockchain } from "../core/blockchain";
import { latest_polygon_price } from "../core/price";
import { Token } from "../types/token";

export class Polygon extends Blockchain {
    private static instance: Polygon;
    private constructor() {
        super(
            "Polygon",
            137,
            process.env.POLYGON_RPC || "https://polygon-rpc.com",
        )
    }

    public static get_instance(): Polygon {
        if (!Polygon.instance) {
            Polygon.instance = new Polygon();
        }
        return Polygon.instance;
    }

    async native_token(): Promise<Token> {
        let price = await latest_polygon_price();
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
            address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            decimals: 6,
            chain_id: this.chain_id,
            type: 0
        }
    }

    weth_token(): Token {
        return {
            address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            decimals: 18,
            chain_id: this.chain_id,
            type: 0
        }
    }
}