import { TextPostInterface, PostTypes } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class TextPostEntity extends PostEntity implements TextPostInterface {
    public announcement: string;
    public text: string;
    public type: PostTypes.Text;

    constructor(post: TextPostInterface) {
        super(post);
        this.announcement = post.announcement;
        this.type = post.type;
        this.text = post.text;
    }

    public toPOJO() {
        return {
            ...super.toPOJO(),
            type: this.type,
            announcement: this.announcement,
            text: this.text
        }
    }
}
