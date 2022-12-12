export declare type Token = {
    address: string;
    decimals: number;
    chain_id: number;
    type: TokenType;
    price?: number;
};

export declare enum TokenType {
    ERC20,
    ERC721,
    NATIVE
}