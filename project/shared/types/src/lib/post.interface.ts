import { TagInterface } from './tag.interface';

export interface PostInterface {
  id?: string;
  name: string;
  tags: TagInterface[];
  authorId?: string;
  status: string;
  likesCount: number;
}
