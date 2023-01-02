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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniswap = void 0;
var types_1 = require("../types");
var blockchains_1 = require("../blockchains");
var core_1 = require("../core");
/**
 * The Uniswap DEX class
 */
var Uniswap = /** @class */ (function (_super) {
    __extends(Uniswap, _super);
    function Uniswap() {
        var _this = _super.call(this, "Uniswap", [blockchains_1.Ethereum.get_instance(), blockchains_1.Polygon.get_instance(), blockchains_1.Optimism.get_instance(), blockchains_1.Arbitrum.get_instance()], [types_1.TradeType.EXACT_INPUT, types_1.TradeType.EXACT_OUTPUT]) || this;
        _this.router_mapping = {};
        _this.supported_chains.forEach(function (chain) {
            _this.router_mapping[chain.name] = new types_1.AlphaRouter({ chainId: chain.chain_id, provider: new types_1.ethers.providers.JsonRpcProvider(chain.rpc_url) });
        });
        return _this;
    }
    Uniswap.prototype.quote = function (from, from_token, to_token, chain, from_token_amount, to_token_amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var router, from_token_uniswap, to_token_uniswap, trade_type, amount, route, native_token, nonce, gas_price, e_1, gas_used, fee, transaction, quote;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.supported_chains.includes(chain)) {
                            throw new Error("Chain ".concat(chain.name, " is not supported by ").concat(this.name));
                        }
                        router = this.router_mapping[chain.name];
                        // ---------------------- Handle ETH ----------------------
                        if (from_token && from_token.type == 2) {
                            from_token.address = chain.wrapped_native_token().address;
                        }
                        if (to_token && to_token.type == 2) {
                            to_token.address = chain.wrapped_native_token().address;
                        }
                        from_token_uniswap = new types_1.UniswapToken(chain.chain_id, from_token.address, from_token.decimals, "", "");
                        to_token_uniswap = new types_1.UniswapToken(chain.chain_id, to_token.address, to_token.decimals, "", "");
                        trade_type = from_token_amount ? types_1.TradeType.EXACT_INPUT : types_1.TradeType.EXACT_OUTPUT;
                        amount = from_token_amount ? types_1.CurrencyAmount.fromRawAmount(from_token_uniswap, from_token_amount) : types_1.CurrencyAmount.fromRawAmount(to_token_uniswap, to_token_amount);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                router.route(amount, trade_type == types_1.TradeType.EXACT_INPUT ? to_token_uniswap : from_token_uniswap, trade_type, {
                                    slippageTolerance: new types_1.Percent(slippage ? slippage : 1, 100),
                                    recipient: from,
                                    type: 1,
                                    // Deadline in 30 mins
                                    deadline: Math.floor(Date.now() / 1000) + (60 * 30),
                                }),
                                chain.native_token(),
                                chain.client.eth.getTransactionCount(from),
                                chain.client.eth.getGasPrice()
                            ])];
                    case 2:
                        // Get the route and native token
                        _a = _b.sent(), route = _a[0], native_token = _a[1], nonce = _a[2], gas_price = _a[3];
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        throw new Error("Uniswap API error");
                    case 4:
                        from_token_amount !== null && from_token_amount !== void 0 ? from_token_amount : (from_token_amount = route.quote.numerator.toString());
                        to_token_amount !== null && to_token_amount !== void 0 ? to_token_amount : (to_token_amount = route.quote.numerator.toString());
                        gas_used = route.estimatedGasUsed;
                        fee = new types_1.Fee(gas_used, gas_price, native_token);
                        transaction = {
                            to: route.methodParameters.to,
                            from: from,
                            nonce: nonce,
                            gasLimit: gas_used,
                            gasPrice: types_1.BigNumber.from(gas_price),
                            data: route.methodParameters.calldata,
                            value: from_token.type == 2 ? types_1.BigNumber.from(from_token_amount) : types_1.BigNumber.from(0),
                            chainId: chain.chain_id,
                        };
                        quote = new types_1.Quote(from_token_amount, to_token_amount, chain, fee, transaction, this.name);
                        return [2 /*return*/, quote];
                }
            });
        });
    };
    return Uniswap;
}(core_1.Dex));
exports.Uniswap = Uniswap;
