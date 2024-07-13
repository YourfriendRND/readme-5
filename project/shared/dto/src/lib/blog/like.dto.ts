import { IsNotEmpty, IsMongoId, IsUUID } from 'class-validator';
import { 
    POST_ID_IS_EMPTY, 
    USER_ID_IS_EMPTY, 
    POST_ID_IS_NOT_CORRECT, 
    USER_ID_IS_NOT_CORRECT
} from '@project/shared/constants';

export class LikeDto {

    @IsNotEmpty({ message: USER_ID_IS_EMPTY })
    @IsMongoId({ message: USER_ID_IS_NOT_CORRECT })
    public userId!: string;

    @IsNotEmpty({ message: POST_ID_IS_EMPTY })
    @IsUUID('all', { message: POST_ID_IS_NOT_CORRECT })
    public postId!: string;

}