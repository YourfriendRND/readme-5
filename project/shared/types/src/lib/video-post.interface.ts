import { PostInterface } from "./post.interface";
import { PostTypes } from "./post.type";

export interface VideoPostInterface extends PostInterface {
  videoUrl: string;
  type: PostTypes.Video;
}
