import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsUUID, Length } from 'class-validator';
import { COMMENT_AUTHOR_ID_NOT_VALID, COMMENT_LENGTH_NOT_VALID, COMMENT_NOT_VALID, COMMENT_TO_POST_ID_NOT_VALID, ValidationParams } from '../comment.constants';

export class CommentDTO {

  @ApiProperty({
    description: 'Comment text',
    example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
  })
  @IsString({ message: COMMENT_NOT_VALID })
  @Length(ValidationParams.CommentMinLength, ValidationParams.CommentMaxLength, { message: COMMENT_LENGTH_NOT_VALID })
  public text: string;

  // @ApiProperty({
  //   description: 'Uniq ID of commented post',
  //   example: '194aef61-ab72-4f66-a0ff-07b742d88bb9'
  // })
  // @IsUUID('all', { message: COMMENT_TO_POST_ID_NOT_VALID })
  // public postId: string;

  @ApiProperty({
    description: 'Uniq ID of comment author',
    example: '659ac76f8fcee5cc6bd9dee3',
  })
  @IsMongoId({message: COMMENT_AUTHOR_ID_NOT_VALID })
  public authorId: string;

}
