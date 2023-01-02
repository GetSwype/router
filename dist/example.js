"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockchains_1 = require("./blockchains");
var portals_1 = require("./dexes/portals");
var helpers_1 = require("./test/helpers");
var portals = new portals_1.Portals();
var ethereum = blockchains_1.Ethereum.get_instance();
var from_token = helpers_1.eth_native;
var to_token = helpers_1.eth_dai;
var from_token_amount = "1000000000000000000";
portals.quote("0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5", from_token, to_token, ethereum, from_token_amount).then(function (quote) {
    console.log("Retrieved quote: ", quote);
}).catch(function (err) {
    console.log("Error: ", err);
});
