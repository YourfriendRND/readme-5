import { PostInterface } from './post.interface';
import { PostTypes } from './post.type';

export interface TextPostInterface extends PostInterface {
  announcement: string;
  text: string;
  type: PostTypes.Text;
}
