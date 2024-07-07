import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { 
    FIELD_USER_ID_IS_EMPTY, 
    FIELD_FOLLOWER_ID_IS_EMPTY, 
    NOT_CORRECT_ID_TYPE
} from '@project/shared/constants';

export class FollowerDTO {
    
    @ApiProperty({
        description: 'The author uniq ID',
        example: '659ac76f8fcee5cc6bd9dee3',
        required: true,
    })
    @IsNotEmpty({ message: FIELD_USER_ID_IS_EMPTY })
    @IsMongoId({ message: `[userId field]: ${NOT_CORRECT_ID_TYPE}` })
    public userId!: string;

    @ApiProperty({
        description: 'The follower uniq ID',
        example: '65d8eb73ab733b50fa262db7',
        required: true
    })
    @IsNotEmpty({ message: FIELD_FOLLOWER_ID_IS_EMPTY })
    @IsMongoId({ message: `[followerId field: ${NOT_CORRECT_ID_TYPE}`})
    public followerId!: string;

}
