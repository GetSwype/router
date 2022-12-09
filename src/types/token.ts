import { Blockchain } from "../core/blockchain";

export declare type Token = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    price: number;
    logo?: string;
    chain: Blockchain;
    type: TokenType;
};

enum TokenType {
    ERC20,
    ERC721,
    NATIVE
}