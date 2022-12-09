import { BigNumber, BigNumberish } from "@ethersproject/bignumber"
import { Token } from "./token";

export default class Fee {
    base_fee: BigNumberish;
    limit: BigNumberish;
    token: Token;
    total_fee: BigNumberish;
    fiat_fee: number;

    constructor(
        base_fee: BigNumberish,
        limit: BigNumberish,
        token: Token,
    ) {
        this.base_fee = base_fee;
        this.limit = limit;
        this.token = token;
        this.total_fee = BigNumber.from(base_fee).mul(BigNumber.from(limit));
        let fee_in_whole_units = this.total_fee.div(BigNumber.from(10).pow(token.decimals))
        this.fiat_fee = Math.floor((fee_in_whole_units.mul(token.price).toNumber())*100)
    }
}