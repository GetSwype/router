"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
var web3_1 = __importDefault(require("web3"));
var Blockchain = /** @class */ (function () {
    function Blockchain(name, chain_id, rpc_url) {
        this.name = name;
        this.chain_id = chain_id;
        this.rpc_url = rpc_url;
        this.client = new web3_1.default(rpc_url);
    }
    return Blockchain;
}());
exports.Blockchain = Blockchain;
