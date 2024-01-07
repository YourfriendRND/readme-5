import { PostTypes, VideoPostInterface } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class VideoPostEntity extends PostEntity implements VideoPostInterface {
    public videoUrl: string;
    public type: PostTypes.Video;

    constructor(post: VideoPostInterface) {
        super(post);
        this.populate(post);
        this.videoUrl = post.videoUrl;
    }

    public toPOJO() {
        return {
            ...super.toPOJO(),
            type: this.type,
            videoUrl: this.videoUrl,
        }
    }
}
