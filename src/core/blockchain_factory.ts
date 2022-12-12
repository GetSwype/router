import { Arbitrum, Ethereum, Optimism, Polygon } from "../blockchains";
import { Blockchain } from "./blockchain";

export function BlockchainFactory(chain_id: number): Blockchain {
    switch (chain_id) {
        case 1:
            return Ethereum.get_instance();
        case 137:
            return Polygon.get_instance();
        case 42161:
            return Arbitrum.get_instance();
        case 10:
            return Optimism.get_instance();
        default:
            throw new Error("Unsupported chain id");
    }
}