import { LinkPostInterface, PostTypes } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class LinkPostEntity extends PostEntity implements LinkPostInterface {
    public url: string;
    public type: PostTypes.Link;

    constructor(post: LinkPostInterface) {
        super(post);
        this.url = post.url;
        this.type = post.type;
    }

    public toPOJO() {
        return {
            ...super.toPOJO(),
            url: this.url,
            type: this.type,
        }
    }
}
