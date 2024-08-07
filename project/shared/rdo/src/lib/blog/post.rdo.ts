import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TagInterface, PostTypes } from '@project/shared/types';
import { TagRDO } from './tag.rdo';

export class PostRDO {
  @ApiProperty({
    description: 'The uniq ID of post',
    example: '476179f0-f3ab-493b-86ee-ad046f6fedf0',
    required: true,
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'The name of blog post',
    example: 'Good news',
    required: true
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'List of tags for post',
    example: [{
      id: 'db662724-f91d-4b46-8291-bccee0cf1a91',
      name: 'henparty',
    }
    ]
  })
  @Expose()
  @Type(() => TagRDO)
  public tags!: TagInterface[];

  @ApiProperty({
    description: 'Status of post: draft or published',
    example: 'draft'
  })
  @Expose()
  public status!: string;

  @ApiProperty({
    description: 'The Author uniq ID',
    example: 'fe487f22-ec92-4ca3-8b31-aea218be8780'
  })
  @Expose()
  public url!: string;

  @ApiProperty({
    description: 'valid URL, requiered for post with type: link',
    example: 'https://placeholder.com'
  })
  @Expose()
  public photo!: string;

  @ApiProperty({
    description: 'Text of post, requiered for post with type: text and quote',
    example: `Lorem Ipsum is simply dummy text of the printing and typesetting industry's.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: 'Text announcing the publication, requiered for post with type: text',
    example: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
    making it look like readable English.`
  })
  @Expose()
  public announcement!: string;

  @ApiProperty({
    description: 'Unique ID of the quoted author, requiered for post with type: quote',
    example: '659ac76f8fcee5cc6bd9dee3',
  })
  @Expose()
  public quoteAuthorId!: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Example of quoted text'
  })
  @Expose()
  public quotedText!: string;

  @ApiProperty({
    description: 'URL for video content, requiered for post with type: video',
    example: 'https://www.youtube.com/watch?v=JxS5E-kZc2s'
  })
  @Expose()
  public videoUrl!: string;

  @ApiProperty({
    description: 'Type of post',
    example: PostTypes.Text
  })
  @Expose()
  public type!: PostTypes.Link | PostTypes.Photo | PostTypes.Quote | PostTypes.Text | PostTypes.Video;

  @ApiProperty({
    description: 'The uniq ID of posts author',
    example: '659ac76f8fcee5cc6bd9dee3'
  })
  @Expose()
  public authorId!: string;

  @ApiProperty({
    description: 'The date of post publishing',
    example: '2024-06-14T18:00:00.000Z',
  })
  @Expose()
  public publishedAt!: Date;

  @ApiProperty({
    description: 'Repost sign',
    example: true,
  })
  @Expose()
  public isRepost!: boolean;

  @ApiProperty({
    description: 'Original post id after repost',
    example: '43052d31-35d3-4b82-a767-2a39a1fbbf85'
  })
  @Expose()
  public originalPostId!: string;

  @ApiProperty({
    description: `Id of original author's post`,
    example: '65a3f657fb04b4c2846e9094'
  })
  @Expose()
  public originalAuthorId!: string;

  @ApiProperty({
    description: 'The quantity of users likes to post',
    example: 4
  })
  @Expose()
  public likes!: number;
}
