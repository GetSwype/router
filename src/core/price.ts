import Web3 from "web3";
const abi = require("../abi/chainlink.json")

export async function latest_eth_price() {
    let web3 = new Web3("https://eth-mainnet.g.alchemy.com/v2/arkl6V3Gvly4hMnmxqb4hjdCVRAWhkmY");
    let contract = new web3.eth.Contract(abi, "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}

export async function latest_polygon_price() {
    let web3 = new Web3("https://polygon-rpc.com");
    let contract = new web3.eth.Contract(abi, "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0");
    let price: any = await contract.methods.latestRoundData().call();
    return price.answer/10**8;
}