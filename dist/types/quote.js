"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
/**
 * The default quote class that is returned by the DEX class when asking for a quote with calldata
 */
var Quote = /** @class */ (function () {
    function Quote(from_token_amount, to_token_amount, chain, fee, transaction, dex) {
        this.from_token_amount = from_token_amount;
        this.to_token_amount = to_token_amount;
        this.chain = chain;
        this.fee = fee;
        this.transaction = transaction;
        this.dex = dex;
    }
    return Quote;
}());
exports.Quote = Quote;
