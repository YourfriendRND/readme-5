import { PostInterface } from './post.interface';
import { PostTypes } from './post.type';

export interface QuotePostInterface extends PostInterface {
  quoteAuthorId: string;
  text: string;
  type: PostTypes.Quote;
}
