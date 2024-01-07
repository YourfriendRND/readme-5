import { PostInterface } from './post.interface';
import { PostTypes } from './post.type';

export interface LinkPostInterface extends PostInterface {
  url: string;
  description?: string;
  type: PostTypes.Link;
}
