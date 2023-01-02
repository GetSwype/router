import { BigNumber } from "ethers";
import { Arbitrum, Ethereum, Optimism, Polygon } from "../blockchains";
import { Aggregator } from "../core";
import { OneInch, Paraswap, Uniswap } from "../dexes";
import { Portals } from "../dexes/portals";

let from = "0x454b2a2f2c9c0f3183a1fddfae2d1a6c5c5c3d3e"
let polygon = Polygon.get_instance()
let arbitrum = Arbitrum.get_instance()
let optimism = Optimism.get_instance()
let ethereum = Ethereum.get_instance()
let dai_ethereum = {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    chain_id: ethereum.chain_id,
    type: 0
}
let dai_polygon = {
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    chain_id: polygon.chain_id,
    type: 0
}
let dai_optimism = {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    chain_id: optimism.chain_id,
    type: 0
}
let dai_arbitrum = {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    chain_id: arbitrum.chain_id,
    type: 0
}
let eth_arbitrum = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: arbitrum.chain_id,
    type: 2
}
let eth_optimism = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: optimism.chain_id,
    type: 2
}
let matic = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: polygon.chain_id,
    type: 2
}
let eth_ethereum = {
    address: "0x00000000000000000000000000000000000000000",
    decimals: 18,
    chain_id: ethereum.chain_id,
    type: 2
}

let aggregator = new Aggregator([
    new Uniswap(),
    new OneInch(),
    new Paraswap(),
    new Portals()
])

describe("Test SELL swaps", () => {
    describe("Test Ethereum swaps", () => {
        test('Test ETH to USDC on Ethereum', async () => {
            let quote = await aggregator.quote(
                from,
                eth_ethereum,
                ethereum.usdc_token(),
                1,
                "1000000000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Ethereum", async () => {
            let quote = await aggregator.quote(
                from,
                ethereum.usdc_token(),
                eth_ethereum,
                1,
                "1000000000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Ethereum", async () => {
            let quote = await aggregator.quote(
                from,
                ethereum.usdc_token(),
                dai_ethereum,
                1,
                "1000000000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Polygon swaps", () => {
        test('Test MATIC to USDC on Polygon', async () => {
            let quote = await aggregator.quote(
                from,
                matic,
                polygon.usdc_token(),
                137,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to MATIC on Polygon", async () => {
            let quote = await aggregator.quote(
                from,
                polygon.usdc_token(),
                matic,
                137,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Polygon", async () => {
            let quote = await aggregator.quote(
                from,
                polygon.usdc_token(),
                dai_polygon,
                137,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Arbitrum swaps", () => {
        test('Test ETH to USDC on Arbitrum', async () => {
            let quote = await aggregator.quote(
                from,
                eth_arbitrum,
                arbitrum.usdc_token(),
                42161,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Arbitrum", async () => {
            let quote = await aggregator.quote(
                from,
                arbitrum.usdc_token(),
                eth_arbitrum,
                42161,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Abitrum", async () => {
            let quote = await aggregator.quote(
                from,
                arbitrum.usdc_token(),
                dai_arbitrum,
                42161,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Optimism swaps", () => {
        test('Test ETH to USDC on Optimism', async () => {
            let quote = await aggregator.quote(
                from,
                eth_optimism,
                optimism.usdc_token(),
                10,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Optimism", async () => {
            let quote = await aggregator.quote(
                from,
                optimism.usdc_token(),
                eth_optimism,
                10,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Optimism", async () => {
            let quote = await aggregator.quote(
                from,
                optimism.usdc_token(),
                dai_optimism,
                10,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })
})

describe("Test BUY swaps", () => {
    describe("Test Ethereum swaps", () => {
        test('Test ETH to USDC on Ethereum', async () => {
            let quote = await aggregator.quote(
                from,
                eth_ethereum,
                ethereum.usdc_token(),
                1,
                null,
                "100000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Ethereum", async () => {
            let quote = await aggregator.quote(
                from,
                ethereum.usdc_token(),
                eth_ethereum,
                1,
                null,
                "1000000000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Ethereum", async () => {
            let quote = await aggregator.quote(
                from,
                ethereum.usdc_token(),
                dai_ethereum,
                1,
                null,
                "1000000000000",
            )
            console.log("Quote: ", quote)
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Polygon swaps", () => {
        test('Test MATIC to USDC on Polygon', async () => {
            let quote = await aggregator.quote(
                from,
                matic,
                polygon.usdc_token(),
                137,
                null,
                "100000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to MATIC on Polygon", async () => {
            let quote = await aggregator.quote(
                from,
                polygon.usdc_token(),
                matic,
                137,
                null,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Polygon", async () => {
            let quote = await aggregator.quote(
                from,
                polygon.usdc_token(),
                dai_polygon,
                137,
                null,
                "1000000000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Arbitrum swaps", () => {
        test('Test ETH to USDC on Arbitrum', async () => {
            let quote = await aggregator.quote(
                from,
                eth_arbitrum,
                arbitrum.usdc_token(),
                42161,
                null,
                "100000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Arbitrum", async () => {
            let quote = await aggregator.quote(
                from,
                arbitrum.usdc_token(),
                eth_arbitrum,
                42161,
                null,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Abitrum", async () => {
            let quote = await aggregator.quote(
                from,
                arbitrum.usdc_token(),
                dai_arbitrum,
                42161,
                null,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })

    describe("Test Optimism swaps", () => {
        test('Test ETH to USDC on Optimism', async () => {
            let quote = await aggregator.quote(
                from,
                eth_optimism,
                optimism.usdc_token(),
                10,
                null,
                "100000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.value).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to ETH on Optimism", async () => {
            let quote = await aggregator.quote(
                from,
                optimism.usdc_token(),
                eth_optimism,
                10,
                null,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)

        test("Test USDC to DAI on Optimism", async () => {
            let quote = await aggregator.quote(
                from,
                optimism.usdc_token(),
                dai_optimism,
                10,
                null,
                "1000000000000",
            )
            expect(quote).toBeDefined()
            expect(BigNumber.from(quote.transaction.gasLimit).gt(0)).toBe(true)
            expect(BigNumber.from(quote.transaction.gasPrice).gt(0)).toBe(true)
            expect(quote.transaction.data).toBeDefined()
        }, 30000)
    })
})