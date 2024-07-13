import { Expose } from 'class-transformer';

export class AuthorPostsRDO {
    
    @Expose()
    public authorId!: string;

    @Expose()
    public posts!: number;
    
}