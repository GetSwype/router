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
var web3_1 = __importDefault(require("web3"));
var ethers_1 = require("ethers");
var blockchains_1 = require("../blockchains");
var dexes_1 = require("../dexes");
var helpers_1 = require("./helpers");
var portals_1 = require("../dexes/portals");
var uniswap = new dexes_1.Uniswap();
var paraswap = new dexes_1.Paraswap();
var one_inch = new dexes_1.OneInch();
var portals = new portals_1.Portals();
var ethereum = blockchains_1.Ethereum.get_instance();
describe("Test Uniswap", function () {
    test("Test selling 1 ETH for DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, from_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_native;
                    to_token = helpers_1.eth_dai;
                    from_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, uniswap.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, from_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
                    expect(ethers_1.BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
    test("Test buying 1 ETH with DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, to_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_dai;
                    to_token = helpers_1.eth_native;
                    to_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, uniswap.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, null, to_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(ethers_1.BigNumber.from(quote.from_token_amount).gt(0)).toBe(true);
                    expect(quote.to_token_amount.toString()).toBe(to_token_amount.toString());
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
});
describe("Test Paraswap", function () {
    test("Test selling 1 ETH for DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, from_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_native;
                    to_token = helpers_1.eth_dai;
                    from_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, paraswap.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, from_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
                    expect(ethers_1.BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
    test("Test buying 1 ETH with DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, to_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_dai;
                    to_token = helpers_1.eth_native;
                    to_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, paraswap.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, null, to_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(ethers_1.BigNumber.from(quote.from_token_amount).gt(0)).toBe(true);
                    expect(quote.to_token_amount.toString()).toBe(to_token_amount.toString());
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
});
describe("Test 1Inch", function () {
    test("Test selling 1 ETH for DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, from_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_native;
                    to_token = helpers_1.eth_dai;
                    from_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, one_inch.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, from_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
                    expect(ethers_1.BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
    test("Test buying 1 ETH with DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, to_token_amount, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_dai;
                    to_token = helpers_1.eth_native;
                    to_token_amount = web3_1.default.utils.toWei("1", "ether");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, one_inch.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, null, to_token_amount)];
                case 2:
                    _a.sent();
                    expect(true).toBe(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1.message).toBe("1inch only supports exact input trades");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 20000);
});
describe("Test Portals", function () {
    test("Test selling 1 ETH for DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, from_token_amount, quote;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_native;
                    to_token = helpers_1.eth_dai;
                    from_token_amount = web3_1.default.utils.toWei("1", "ether");
                    return [4 /*yield*/, portals.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, from_token_amount)];
                case 1:
                    quote = _a.sent();
                    console.log("Retrieved quote: ", quote);
                    expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
                    expect(ethers_1.BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); }, 20000);
    test("Test buying 1 ETH with DAI on ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from_token, to_token, to_token_amount, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from_token = helpers_1.eth_dai;
                    to_token = helpers_1.eth_native;
                    to_token_amount = web3_1.default.utils.toWei("1", "ether");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, portals.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, null, to_token_amount)];
                case 2:
                    _a.sent();
                    expect(true).toBe(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    expect(error_2.message).toBe("Portals only supports exact input trades");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 20000);
});
