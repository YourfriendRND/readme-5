import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {

  @ApiProperty({
    description: 'Comment text',
    example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
  })
  public text: string;

  @ApiProperty({
    description: 'Uniq ID of commented post',
    example: '194aef61-ab72-4f66-a0ff-07b742d88bb9'
  })
  public postId: string;

  @ApiProperty({
    description: 'Uniq ID of comment author',
    example: '97cbdc0a-2f8c-475e-9dae-4ff9c4c431c4',
  })
  public authorId: string;

}
