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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var blockchains_1 = require("../blockchains");
var core_1 = require("../core");
var dexes_1 = require("../dexes");
var portals_1 = require("../dexes/portals");
var from = "0x454b2a2f2c9c0f3183a1fddfae2d1a6c5c5c3d3e";
var polygon = blockchains_1.Polygon.get_instance();
var arbitrum = blockchains_1.Arbitrum.get_instance();
var optimism = blockchains_1.Optimism.get_instance();
var ethereum = blockchains_1.Ethereum.get_instance();
var dai_ethereum = {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    chain_id: ethereum.chain_id,
    type: 0
};
var dai_polygon = {
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    chain_id: polygon.chain_id,
    type: 0
};
var dai_optimism = {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    chain_id: optimism.chain_id,
    type: 0
};
var dai_arbitrum = {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    chain_id: arbitrum.chain_id,
    type: 0
};
var eth_arbitrum = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: arbitrum.chain_id,
    type: 2
};
var eth_optimism = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: optimism.chain_id,
    type: 2
};
var matic = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: polygon.chain_id,
    type: 2
};
var eth_ethereum = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: ethereum.chain_id,
    type: 2
};
var aggregator = new core_1.Aggregator([
    new dexes_1.Uniswap(),
    new dexes_1.OneInch(),
    new dexes_1.Paraswap(),
    new portals_1.Portals()
]);
describe("Test SELL swaps", function () {
    describe("Test Ethereum swaps", function () {
        test('Test ETH to USDC on Ethereum', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_ethereum, ethereum.usdc_token(), 1, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, ethereum.usdc_token(), eth_ethereum, 1, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, ethereum.usdc_token(), dai_ethereum, 1, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Polygon swaps", function () {
        test('Test MATIC to USDC on Polygon', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, matic, polygon.usdc_token(), 137, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to MATIC on Polygon", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, polygon.usdc_token(), matic, 137, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Polygon", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, polygon.usdc_token(), dai_polygon, 137, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Arbitrum swaps", function () {
        test('Test ETH to USDC on Arbitrum', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_arbitrum, arbitrum.usdc_token(), 42161, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Arbitrum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, arbitrum.usdc_token(), eth_arbitrum, 42161, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Abitrum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, arbitrum.usdc_token(), dai_arbitrum, 42161, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Optimism swaps", function () {
        test('Test ETH to USDC on Optimism', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_optimism, optimism.usdc_token(), 10, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Optimism", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, optimism.usdc_token(), eth_optimism, 10, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Optimism", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, optimism.usdc_token(), dai_optimism, 10, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
});
describe("Test BUY swaps", function () {
    describe("Test Ethereum swaps", function () {
        test('Test ETH to USDC on Ethereum', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_ethereum, ethereum.usdc_token(), 1, null, "100000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, ethereum.usdc_token(), eth_ethereum, 1, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Ethereum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, ethereum.usdc_token(), dai_ethereum, 1, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        console.log("Quote: ", quote);
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Polygon swaps", function () {
        test('Test MATIC to USDC on Polygon', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, matic, polygon.usdc_token(), 137, null, "100000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to MATIC on Polygon", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, polygon.usdc_token(), matic, 137, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Polygon", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, polygon.usdc_token(), dai_polygon, 137, null, "1000000000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Arbitrum swaps", function () {
        test('Test ETH to USDC on Arbitrum', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_arbitrum, arbitrum.usdc_token(), 42161, null, "100000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Arbitrum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, arbitrum.usdc_token(), eth_arbitrum, 42161, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Abitrum", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, arbitrum.usdc_token(), dai_arbitrum, 42161, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
    describe("Test Optimism swaps", function () {
        test('Test ETH to USDC on Optimism', function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, eth_optimism, optimism.usdc_token(), 10, null, "100000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.value).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to ETH on Optimism", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, optimism.usdc_token(), eth_optimism, 10, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
        test("Test USDC to DAI on Optimism", function () { return __awaiter(void 0, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aggregator.quote(from, optimism.usdc_token(), dai_optimism, 10, null, "1000000000000")];
                    case 1:
                        quote = _a.sent();
                        expect(quote).toBeDefined();
                        expect(ethers_1.BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true);
                        expect(ethers_1.BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true);
                        expect(quote.transaction.data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); }, 30000);
    });
});
