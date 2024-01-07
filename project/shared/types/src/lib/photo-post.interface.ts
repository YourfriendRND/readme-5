import { PostInterface } from './post.interface';
import { PostTypes } from './post.type';

export interface PhotoPostInterface extends PostInterface {
  photo: string;
  type: PostTypes.Photo;
}
