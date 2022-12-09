import { BigNumberish } from "@ethersproject/bignumber";

export declare type UnsignedTransaction = {
    to: string;
    from: string;
    data: string;
    value?: BigNumberish;
    base_fee: BigNumberish;
    limit: BigNumberish;
}