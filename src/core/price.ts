
import { Ethereum } from "./blockchain";
import { Token } from "../types/token";
import Web3 from "web3";
const abi = require("../abi/chainlink.json")

export async function latest_eth_price() {
    let web3 = new Web3("https://eth-mainnet.g.alchemy.com/v2/arkl6V3Gvly4hMnmxqb4hjdCVRAWhkmY");
    let contract = new web3.eth.Contract(abi, "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}


export async function EthereumToken(): Promise<Token> {
    try {
        let price = await latest_eth_price();
        return { 
            address: "0x0000000000000000000000000000000000000000",
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            price: price,
            chain: Ethereum,
            type: 2
        } as Token;
    } catch (err) {
        console.log(err);
        return null;
    }
} 