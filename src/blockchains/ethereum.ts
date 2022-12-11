import { Blockchain } from "../core/blockchain";
import { latest_eth_price } from "../core/price";
import { Token } from "../types/token";

export default class Ethereum extends Blockchain {
    private static instance: Ethereum;
    private constructor() {
        super(
            "Ethereum",
            1,
            60,
            "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            "https://etherscan.io/tx/"
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
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            price,
            chain_id: this.chain_id,
            type: 2
        }
    }
}