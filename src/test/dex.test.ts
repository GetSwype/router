import { BigNumber } from "ethers";
import Web3 from "web3";
import Ethereum from "../blockchains/ethereum";
import Paraswap from "../dexes/paraswap";
import Uniswap from "../dexes/uniswap"
import { eth_dai, eth_native } from "./helpers";

let uniswap = new Uniswap();
let paraswap = new Paraswap();
let ethereum = Ethereum.get_instance()

describe("Test Uniswap", () => {
    test("Test selling 1 ETH for DAI on ethereum", async() => {
        let from_token = eth_native;
        let to_token = eth_dai;
        let from_token_amount = Web3.utils.toWei("1", "ether");
    
        let quote = await uniswap.quote(
            "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
            from_token,
            to_token,
            ethereum,
            from_token_amount,
        );
        
        console.log("Retrieved quote: ", quote);
        expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
        expect(BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
    }, 20000);
    
    
    
    test("Test buying 1 ETH with DAI on ethereum", async() => {
        let from_token = eth_dai;
        let to_token = eth_native;
        let to_token_amount = Web3.utils.toWei("1", "ether");
    
        let quote = await uniswap.quote(
            "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
            from_token,
            to_token,
            ethereum,
            null,
            to_token_amount,
        );
    
        console.log("Retrieved quote: ", quote);
        expect(BigNumber.from(quote.from_token_amount).gt(0)).toBe(true);
        expect(quote.to_token_amount.toString()).toBe(to_token_amount.toString());
    }, 20000);
});

describe("Test Paraswap", () => {
    test("Test selling 1 ETH for DAI on ethereum", async() => {
        let from_token = eth_native;
        let to_token = eth_dai;
        let from_token_amount = Web3.utils.toWei("1", "ether");
    
        let quote = await paraswap.quote(
            "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
            from_token,
            to_token,
            ethereum,
            from_token_amount,
        );
        
        console.log("Retrieved quote: ", quote);
        expect(quote.from_token_amount.toString()).toBe(from_token_amount.toString());
        expect(BigNumber.from(quote.to_token_amount).gt(0)).toBe(true);
    }, 20000);
    
    
    
    test("Test buying 1 ETH with DAI on ethereum", async() => {
        let from_token = eth_dai;
        let to_token = eth_native;
        let to_token_amount = Web3.utils.toWei("1", "ether");
    
        let quote = await paraswap.quote(
            "0x4548Ea5A0d5a294B242a19b1A0BA3dcD3489E1C5",
            from_token,
            to_token,
            ethereum,
            null,
            to_token_amount,
        );
    
        console.log("Retrieved quote: ", quote);
        expect(BigNumber.from(quote.from_token_amount).gt(0)).toBe(true);
        expect(quote.to_token_amount.toString()).toBe(to_token_amount.toString());
    }, 20000);
});