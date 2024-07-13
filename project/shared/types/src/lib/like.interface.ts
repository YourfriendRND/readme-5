export interface PostLike {
    id?: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
}