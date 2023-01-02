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
exports.Paraswap = void 0;
var types_1 = require("../types");
var blockchains_1 = require("../blockchains");
var core_1 = require("../core");
var axios_1 = __importDefault(require("axios"));
var Paraswap = /** @class */ (function (_super) {
    __extends(Paraswap, _super);
    function Paraswap() {
        return _super.call(this, "Paraswap", [blockchains_1.Ethereum.get_instance(), blockchains_1.Polygon.get_instance(), blockchains_1.Arbitrum.get_instance(), blockchains_1.Optimism.get_instance()], [types_1.TradeType.EXACT_INPUT, types_1.TradeType.EXACT_OUTPUT], "https://apiv5.paraswap.io/") || this;
    }
    Paraswap.prototype.quote = function (from, from_token, to_token, chain, from_token_amount, to_token_amount, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var srcToken, destToken, amount, srcDecimals, destDecimals, side, network, userAddress, params, route, native_token, nonce, transaction_request, priceRoute, json, transaction_params, error_1, transaction_data, transaction;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // If the token is eth, paraswap uses a weird address to denominate it
                        if (from_token && from_token.type == 2) {
                            from_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
                        }
                        if (to_token && to_token.type == 2) {
                            to_token.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
                        }
                        srcToken = from_token.address;
                        destToken = to_token.address;
                        amount = (from_token_amount || to_token_amount).toString();
                        srcDecimals = from_token.decimals;
                        destDecimals = to_token.decimals;
                        side = from_token_amount ? "SELL" : "BUY";
                        network = chain.chain_id;
                        userAddress = from;
                        params = {
                            amount: amount,
                            destToken: destToken,
                            srcToken: srcToken,
                            srcDecimals: "".concat(srcDecimals),
                            destDecimals: "".concat(destDecimals),
                            side: side,
                            network: "".concat(network),
                            userAddress: userAddress,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(this.url + "prices?" + new URLSearchParams(params)),
                                chain.native_token(),
                                chain.client.eth.getTransactionCount(from),
                            ])];
                    case 2:
                        _a = _b.sent(), route = _a[0], native_token = _a[1], nonce = _a[2];
                        json = route.data;
                        priceRoute = json.priceRoute;
                        from_token_amount !== null && from_token_amount !== void 0 ? from_token_amount : (from_token_amount = priceRoute.srcAmount);
                        to_token_amount !== null && to_token_amount !== void 0 ? to_token_amount : (to_token_amount = priceRoute.destAmount);
                        params["priceRoute"] = priceRoute;
                        transaction_params = {
                            srcToken: srcToken,
                            destToken: destToken,
                            srcDecimals: "".concat(srcDecimals),
                            destDecimals: "".concat(destDecimals),
                            priceRoute: priceRoute,
                            slippage: "".concat(slippage ? slippage : 50),
                            userAddress: userAddress
                        };
                        if (from_token_amount) {
                            transaction_params["srcAmount"] = amount;
                        }
                        else {
                            transaction_params["destAmount"] = amount;
                        }
                        return [4 /*yield*/, axios_1.default.post(this.url + "transactions/" + chain.chain_id + "?ignoreChecks=true", transaction_params)];
                    case 3:
                        transaction_request = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        throw new Error("Paraswap API error");
                    case 5:
                        transaction_data = transaction_request.data;
                        transaction = {
                            to: transaction_data.to,
                            from: from,
                            nonce: nonce,
                            gasLimit: priceRoute.gasCost,
                            gasPrice: transaction_data.gasPrice,
                            data: transaction_data.data,
                            value: from_token.type == 2 ? types_1.BigNumber.from(from_token_amount) : 0,
                            chainId: chain.chain_id,
                        };
                        return [2 /*return*/, new types_1.Quote(from_token_amount, to_token_amount, chain, new types_1.Fee(transaction_data.gasPrice, priceRoute.gasCost, native_token), transaction, this.name)];
                }
            });
        });
    };
    return Paraswap;
}(core_1.Dex));
exports.Paraswap = Paraswap;
