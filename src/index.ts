import { Ethereum } from "./core/blockchain";
import Uniswap from "./dexes/uniswap";

let swapper = new Uniswap();

let from_token ={
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
    name: "Dai Stablecoin",
    symbol: "DAI",
    price: 1,
    chain: Ethereum,
    type: 0
}

let to_token = {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    name: "Wrapped Ether",
    symbol: "WETH",
    price: 1,
    chain: Ethereum,
    type: 0
}

swapper.quote(
    from_token,
    to_token,
    Ethereum,
    1000000000000000000,
).then(quote => {
    console.log(quote);
}).catch(err => {
    console.log(err);
})