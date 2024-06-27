export interface JWTInterface {
    id?: string;
    tokenId: string;
    createdAt: Date;
    userId: string;
    expiresIn: Date;
}
