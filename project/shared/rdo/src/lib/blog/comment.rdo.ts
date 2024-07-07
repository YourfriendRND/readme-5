import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRDO {
  @ApiProperty({
    description: 'Comment uniq id',
    example: 'b4af52eb-fc97-4bc8-9502-a1a909e2a63e'
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: 'Uniq ID of commented post',
    example: '194aef61-ab72-4f66-a0ff-07b742d88bb9'
  })
  @Expose()
  public postId!: string;

  @ApiProperty({
    description: 'Uniq ID of comment author',
    example: '659ac76f8fcee5cc6bd9dee3',
  })
  @Expose()
  public authorId!: string;

  @ApiProperty({
    description: 'Date and time of comment creation',
    example: '2024-06-18T10:00:00.000',
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: 'Date and time of comment updating',
    example: '2024-06-22T08:00:00.000',
  })
  @Expose()
  public updatedAt!: Date;

}
