import { QuotePostInterface, PostTypes } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class QuotePostEntity extends PostEntity implements QuotePostInterface {
    public text: string;
    public quoteAuthorId: string;
    public type: PostTypes.Quote;
    
    constructor(post: QuotePostInterface) {
        super(post);
        this.type = post.type;
        this.text = post.text;
        this.quoteAuthorId = post.quoteAuthorId;
    }

    toPOJO() {
        return {
            ...super.toPOJO(),
            type: this.type,
            text: this.text,
            quoteAuthorId: this.quoteAuthorId,
        }
    }
}
