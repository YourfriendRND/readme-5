import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length, IsString, IsMongoId } from 'class-validator';
import { 
    COMMENT_AUTHOR_ID_NOT_VALID,
    COMMENT_LENGTH_NOT_VALID,
    COMMENT_NOT_VALID, 
    COMMENT_TO_POST_ID_NOT_VALID,
    COMMENT_ID_NOT_VALID,
    commentValidationParams
} from '@project/shared/constants';

export class UpdateCommentDTO {
    @ApiProperty({
        description: 'The Uniq id of comment',
        example: '8f06cdd3-8584-4f9d-a435-9aa578dc831d',
    })
    @IsUUID(undefined, { message: COMMENT_ID_NOT_VALID })
    public id!: string;

    @ApiProperty({
        description: 'Comment text',
        example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    })
    @IsString({ message: COMMENT_NOT_VALID })
    @Length(commentValidationParams.CommentMinLength, commentValidationParams.CommentMaxLength, { message: COMMENT_LENGTH_NOT_VALID })
    public text!: string;

    @ApiProperty({
        description: 'Uniq ID of commented post',
        example: '194aef61-ab72-4f66-a0ff-07b742d88bb9'
    })
    @IsUUID(undefined, { message: COMMENT_TO_POST_ID_NOT_VALID })
    public postId!: string;

    @ApiProperty({
        description: 'Uniq ID of comment author',
        example: '659ac76f8fcee5cc6bd9dee3',
    })
    @IsMongoId({message: COMMENT_AUTHOR_ID_NOT_VALID })
    public authorId!: string;
}
