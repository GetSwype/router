"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainFactory = void 0;
var blockchains_1 = require("../blockchains");
function BlockchainFactory(chain_id) {
    switch (chain_id) {
        case 1:
            return blockchains_1.Ethereum.get_instance();
        case 137:
            return blockchains_1.Polygon.get_instance();
        case 42161:
            return blockchains_1.Arbitrum.get_instance();
        case 10:
            return blockchains_1.Optimism.get_instance();
        default:
            throw new Error("Unsupported chain id");
    }
}
exports.BlockchainFactory = BlockchainFactory;
