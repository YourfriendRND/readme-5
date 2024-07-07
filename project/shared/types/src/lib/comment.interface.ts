export interface CommentInterface {
  id?: string;
  authorId: string;
  text: string;
  postId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
