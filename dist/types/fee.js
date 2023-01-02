"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var Fee = /** @class */ (function () {
    function Fee(base_fee, limit, token) {
        this.base_fee = base_fee;
        this.limit = limit;
        this.token = token;
        this.total_fee = bignumber_1.BigNumber.from(base_fee).mul(bignumber_1.BigNumber.from(limit));
        var fee_in_whole_units = (this.total_fee.div(bignumber_1.BigNumber.from(10).pow(token.decimals))).toNumber();
        this.fiat_fee = Math.floor((fee_in_whole_units * token.price) * 100);
    }
    return Fee;
}());
exports.Fee = Fee;
