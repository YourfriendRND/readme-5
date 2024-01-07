import { QuotePostInterface, PostTypes } from '@project/shared/types';
import { PostEntity } from '../post.abstract';

export class QuotePostEntity extends PostEntity implements QuotePostInterface {
    public text: string;
    public quoteAuthor: string;
    public type: PostTypes.Quote;
    
    constructor(post: QuotePostInterface) {
        super(post);
        this.type = post.type;
        this.text = post.text;
        this.quoteAuthor = post.quoteAuthor;
    }

    toPOJO() {
        return {
            ...super.toPOJO(),
            type: this.type,
            text: this.text,
            quoteAuthor: this.quoteAuthor,
        }
    }
}
