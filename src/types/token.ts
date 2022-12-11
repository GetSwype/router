import { Blockchain } from "../core/blockchain";

export declare type Token = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    price: number;
    logo?: string;
    chain_id: number;
    type: TokenType;
};

export declare enum TokenType {
    ERC20,
    ERC721,
    NATIVE
}