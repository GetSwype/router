"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portals = void 0;
var sdk_core_1 = require("@uniswap/sdk-core");
var axios_1 = __importDefault(require("axios"));
var blockchains_1 = require("../blockchains");
var core_1 = require("../core");
var types_1 = require("../types");
var Portals = /** @class */ (function (_super) {
    __extends(Portals, _super);
    function Portals() {
        return _super.call(this, "Portals", [blockchains_1.Ethereum.get_instance(), blockchains_1.Optimism.get_instance(), blockchains_1.Polygon.get_instance(), blockchains_1.Arbitrum.get_instance()], [sdk_core_1.TradeType.EXACT_INPUT], "https://api.portals.fi/v1/portal/") || this;
    }
    Portals.prototype.quote = function (from, from_token, to_token, chain, from_token_amount, to_token_amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var sellToken, buyToken, sellAmount, route, transaction, transaction_with_gas, native_token, nonce, gas_price, error_1, transaction_data, route_data, transaction_with_gas_data, quote;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (to_token_amount) {
                            throw new Error("Portals only supports exact input trades");
                        }
                        // If type is eth, Portals uses a weird address to denominate it
                        if (from_token.type == 2) {
                            from_token.address = "0x0000000000000000000000000000000000000000";
                        }
                        if (to_token.type == 2) {
                            to_token.address = "0x0000000000000000000000000000000000000000";
                        }
                        sellToken = from_token.address;
                        buyToken = to_token.address;
                        sellAmount = from_token_amount.toString();
                        slippage = slippage ? slippage : 0.005;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(this.url + chain.name.toLowerCase() + "/estimate?" + new URLSearchParams({
                                    sellToken: sellToken,
                                    buyToken: buyToken,
                                    sellAmount: sellAmount,
                                    slippagePercentage: "".concat(slippage),
                                })),
                                axios_1.default.get(this.url + chain.name.toLowerCase() + "?" + new URLSearchParams({
                                    sellToken: sellToken,
                                    buyToken: buyToken,
                                    sellAmount: sellAmount,
                                    slippagePercentage: "".concat(slippage),
                                    validate: "false",
                                    takerAddress: from
                                })),
                                axios_1.default.get(this.url + chain.name.toLowerCase() + "?" + new URLSearchParams({
                                    sellToken: sellToken,
                                    buyToken: buyToken,
                                    sellAmount: sellAmount,
                                    slippagePercentage: "".concat(slippage),
                                    validate: "true",
                                    takerAddress: "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5"
                                })),
                                chain.native_token(),
                                chain.client.eth.getTransactionCount(from),
                                chain.client.eth.getGasPrice()
                            ])];
                    case 2:
                        _a = _b.sent(), route = _a[0], transaction = _a[1], transaction_with_gas = _a[2], native_token = _a[3], nonce = _a[4], gas_price = _a[5];
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        throw new Error("Portals API error");
                    case 4:
                        transaction_data = transaction.data;
                        route_data = route.data;
                        transaction_with_gas_data = transaction_with_gas.data;
                        quote = new types_1.Quote(from_token_amount, route_data.buyAmount, chain, new types_1.Fee(gas_price, transaction_with_gas_data.context.gasLimit, native_token), {
                            from: from,
                            to: transaction_data.tx.to,
                            value: from_token.type == 2 ? types_1.BigNumber.from(from_token_amount) : types_1.BigNumber.from(0),
                            data: transaction_data.tx.data,
                            nonce: nonce,
                            gasPrice: types_1.BigNumber.from(gas_price),
                            gasLimit: types_1.BigNumber.from(transaction_with_gas_data.context.gasLimit),
                            chainId: chain.chain_id
                        }, "Portals");
                        return [2 /*return*/, quote];
                }
            });
        });
    };
    return Portals;
}(core_1.Dex));
exports.Portals = Portals;
