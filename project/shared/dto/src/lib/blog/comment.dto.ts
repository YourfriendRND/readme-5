import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';
import { 
    COMMENT_AUTHOR_ID_NOT_VALID, 
    COMMENT_LENGTH_NOT_VALID, 
    COMMENT_NOT_VALID, 
    commentValidationParams
} from '@project/shared/constants';

export class CommentDTO {

  @ApiProperty({
    description: 'Comment text',
    example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
  })
  @IsString({ message: COMMENT_NOT_VALID })
  @Length(commentValidationParams.CommentMinLength, commentValidationParams.CommentMaxLength, { message: COMMENT_LENGTH_NOT_VALID })
  public text!: string;

  @ApiProperty({
    description: 'Uniq ID of comment author',
    example: '659ac76f8fcee5cc6bd9dee3',
  })
  @IsMongoId({message: COMMENT_AUTHOR_ID_NOT_VALID })
  public authorId!: string;

}
