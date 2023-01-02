"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dex = void 0;
/**
 * The base DEX class that all DEXes should extend
 */
var Dex = /** @class */ (function () {
    function Dex(name, supported_chains, supported_trade_types, url, api_key) {
        this.name = name;
        this.supported_chains = supported_chains;
        this.supported_trade_types = supported_trade_types;
        this.url = url;
        this.api_key = api_key;
    }
    return Dex;
}());
exports.Dex = Dex;
