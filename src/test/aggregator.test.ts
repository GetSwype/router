import { Arbitrum, Optimism, Polygon } from "../blockchains";
import { Aggregator } from "../core";
import { OneInch, Paraswap, Uniswap } from "../dexes";
import { Portals } from "../dexes/portals";


let polygon = Polygon.get_instance()
let arbitrum = Arbitrum.get_instance()
let optimism = Optimism.get_instance()
let uni_token = {
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    decimals: 18,
    chain_id: polygon.chain_id,
    type: 0
}
let chain_token = {
    address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    decimals: 18,
    chain_id: arbitrum.chain_id,
    type: 0
}
let dai_token = {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    chain_id: optimism.chain_id,
    type: 0
}

test("Test USDC to Uniswap on Polygon", async () => {
    let aggregator = new Aggregator([
        new Uniswap(),
        new OneInch(),
        new Paraswap(),
        new Portals()
    ])

    let quote = await aggregator.quote(
        "0x454b2a2f2c9c0f3183a1fddfae2d1a6c5c5c3d3e",
        polygon.usdc_token(),
        uni_token,
        polygon.chain_id,
        "100000000"
    )

    expect(quote).not.toBeNull()
}, 30000);


test("Test USDC to Chainlink on Arbitrum", async () => {
    let aggregator = new Aggregator([
        new Uniswap(),
        new OneInch(),
        new Paraswap(),
        new Portals()
    ])

    let quote = await aggregator.quote(
        "0x454b2a2f2c9c0f3183a1fddfae2d1a6c5c5c3d3e",
        arbitrum.usdc_token(),
        chain_token,
        arbitrum.chain_id,
        "100000000"
    )

    expect(quote).not.toBeNull()
}, 30000);


test("Test USDC to DAI on Optimism", async () => {
    let aggregator = new Aggregator([
        new Uniswap(),
        new OneInch(),
        new Paraswap(),
        new Portals()
    ])

    let quote = await aggregator.quote(
        "0x454b2a2f2c9c0f3183a1fddfae2d1a6c5c5c3d3e",
        optimism.usdc_token(),
        dai_token,
        optimism.chain_id,
        "100000000"
    )

    expect(quote).not.toBeNull()
}, 30000);