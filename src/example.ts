import { Ethereum } from "./blockchains";
import { Portals } from "./dexes/portals";
import { eth_dai, eth_native } from "./test/helpers";

let portals = new Portals();
let ethereum = Ethereum.get_instance()
let from_token = eth_native;
let to_token = eth_dai;
let from_token_amount = "1000000000000000000";

portals.quote(
    "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
    from_token,
    to_token,
    ethereum,
    from_token_amount,
).then((quote) => {
    console.log("Retrieved quote: ", quote);
}).catch((err) => {
    console.log("Error: ", err);
})