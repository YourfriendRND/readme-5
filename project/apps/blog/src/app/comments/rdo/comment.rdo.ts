import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRDO {
  @ApiProperty({
    description: 'Comment uniq id',
    example: 'b4af52eb-fc97-4bc8-9502-a1a909e2a63e'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Uniq ID of commented post',
    example: '194aef61-ab72-4f66-a0ff-07b742d88bb9'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Uniq ID of comment author',
    example: '97cbdc0a-2f8c-475e-9dae-4ff9c4c431c4',
  })
  @Expose()
  public authorId: string;

}
