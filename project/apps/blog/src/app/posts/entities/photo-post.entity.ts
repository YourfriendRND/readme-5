import { PhotoPostInterface, PostTypes } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class PhotoPostEntity extends PostEntity implements PhotoPostInterface {
    public photo: string;
    public type: PostTypes.Photo;

    constructor(post: PhotoPostInterface) {
        super(post);
        this.photo = post.photo;
        this.type = post.type;
    }

    public toPOJO() {
        return {
            ...super.toPOJO(),
            type: this.type,
            photo: this.photo,
        }
    }
}
