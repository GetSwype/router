import { Blockchain } from "../core/blockchain";
import { latest_polygon_price } from "../core/price";
import { Token } from "../types/token";

export class Polygon extends Blockchain {
    private static instance: Polygon;
    private constructor() {
        super(
            "Polygon",
            137,
            966,
            "https://polygon-rpc.com",
            "https://polygonscan.com/tx/"
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
}