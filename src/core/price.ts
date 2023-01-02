import Web3 from "web3";
import abi from "../abi/chainlink.json"
import { AbiItem } from 'web3-utils'

export async function latest_eth_price() {
    let web3 = new Web3(process.env.ETHEREUM_RPC || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    let contract = new web3.eth.Contract(abi as AbiItem[], "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}

export async function latest_polygon_price() {
    let web3 = new Web3(process.env.POLYGON_RPC || "https://polygon-rpc.com");
    let contract = new web3.eth.Contract(abi as AbiItem[], "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}

export async function latest_avalanche_price() {
    let web3 = new Web3(process.env.POLYGON_RPC || "https://1rpc.io/avax/c");
    let contract = new web3.eth.Contract(abi as AbiItem[], "0x0a77230d17318075983913bc2145db16c7366156");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}

export async function latest_btc_price() {
    let web3 = new Web3(process.env.ETHEREUM_RPC || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
    let contract = new web3.eth.Contract(abi as AbiItem[], "0xf4030086522a5beea4988f8ca5b36dbc97bee88c");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}