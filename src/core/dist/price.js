"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.latest_btc_price = exports.latest_avalanche_price = exports.latest_polygon_price = exports.latest_eth_price = void 0;
var web3_1 = require("web3");
var chainlink_json_1 = require("../abi/chainlink.json");
function latest_eth_price() {
    return __awaiter(this, void 0, void 0, function () {
        var web3, contract, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1["default"](process.env.ETHEREUM_RPC || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
                    contract = new web3.eth.Contract(chainlink_json_1["default"], "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419");
                    return [4 /*yield*/, contract.methods.latestRoundData().call()];
                case 1:
                    price = _a.sent();
                    return [2 /*return*/, price.answer / Math.pow(10, 8)];
            }
        });
    });
}
exports.latest_eth_price = latest_eth_price;
function latest_polygon_price() {
    return __awaiter(this, void 0, void 0, function () {
        var web3, contract, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1["default"](process.env.POLYGON_RPC || "https://polygon-rpc.com");
                    contract = new web3.eth.Contract(chainlink_json_1["default"], "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0");
                    return [4 /*yield*/, contract.methods.latestRoundData().call()];
                case 1:
                    price = _a.sent();
                    return [2 /*return*/, price.answer / Math.pow(10, 8)];
            }
        });
    });
}
exports.latest_polygon_price = latest_polygon_price;
function latest_avalanche_price() {
    return __awaiter(this, void 0, void 0, function () {
        var web3, contract, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1["default"](process.env.POLYGON_RPC || "https://1rpc.io/avax/c");
                    contract = new web3.eth.Contract(chainlink_json_1["default"], "0x0a77230d17318075983913bc2145db16c7366156");
                    return [4 /*yield*/, contract.methods.latestRoundData().call()];
                case 1:
                    price = _a.sent();
                    return [2 /*return*/, price.answer / Math.pow(10, 8)];
            }
        });
    });
}
exports.latest_avalanche_price = latest_avalanche_price;
function latest_btc_price() {
    return __awaiter(this, void 0, void 0, function () {
        var web3, contract, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1["default"](process.env.ETHEREUM_RPC || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
                    contract = new web3.eth.Contract(chainlink_json_1["default"], "0xf4030086522a5beea4988f8ca5b36dbc97bee88c");
                    return [4 /*yield*/, contract.methods.latestRoundData().call()];
                case 1:
                    price = _a.sent();
                    return [2 /*return*/, price.answer / Math.pow(10, 8)];
            }
        });
    });
}
exports.latest_btc_price = latest_btc_price;
