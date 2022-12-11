import Ethereum from "./blockchains/ethereum";
import Uniswap from "./dexes/uniswap";

let swapper = new Uniswap();

let from_token = {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
    name: "Dai Stablecoin",
    symbol: "DAI",
    price: 1,
    chain_id: 1,
    type: 0
}

let to_token = {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    name: "Wrapped Ether",
    symbol: "WETH",
    price: 1,
    chain_id: 1,
    type: 0
}

swapper.quote(
    "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
    from_token,
    to_token,
    Ethereum.get_instance(),
    1000000000000000000,
).then(quote => {
    console.log("Quote: ", quote);
    console.log("Amount of dai to send: ", quote.from_token_amount.toString());
    console.log("Amount of eth to receive: ", quote.to_token_amount.toString());
}).catch(err => {
    console.log(err);
})