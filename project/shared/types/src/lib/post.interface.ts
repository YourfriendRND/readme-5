import { CommentInterface } from './comment.interface';
import { TagInterface } from './tag.interface';

export interface PostInterface {
  id?: string;
  name: string;
  tags: TagInterface[];
  authorId?: string;
  status: string;
  likes?: number;
  type: string;
  announcement?: string;
  text?: string;
  url?: string;
  quoteAuthorId?: string;
  quotedText?: string;
  photo?: string;
  videoUrl?: string;
  publishedAt: Date;
  isRepost?: boolean;
  originalAuthorId?: string;
  originalPostId?: string;
  comments?: CommentInterface[];
}
