import { Expose } from 'class-transformer';

export class FollowerRDO {
    
    @Expose()
    public userId!: string;

    @Expose()
    public followerId!: string;

}
