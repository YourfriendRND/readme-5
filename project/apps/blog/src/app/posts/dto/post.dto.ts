import { ApiProperty } from '@nestjs/swagger';
import { PostTypes, TagInterface } from '@project/shared/types';

export class PostDTO {
    @ApiProperty({
        description: 'The name of blog post',
        example: 'Good news',
        required: true
    })
    public name: string;

    @ApiProperty({
        description: 'List of tags for post',
        example: []
    })
    public tags: TagInterface[];

    @ApiProperty({
      description: 'Status of post: draft or published',
      example: 'published'
    })
    public status: string;

    @ApiProperty({
      description: 'The Author uniq ID',
      example: 'fe487f22-ec92-4ca3-8b31-aea218be8780'
    })
    public authorId: string;

    @ApiProperty({
      description: 'valid URL, requiered for post with type: link',
      example: 'https://placeholder.com'
    })
    public url: string;

    @ApiProperty({
      description: 'File with photo, valid format - jpg, png, requiered for post with type: photo',
      example: 'selfy.jpg'
    })
    public photo: string;

    @ApiProperty({
      description: 'Text of post, requiered for post with type: text and quote',
      example: `Lorem Ipsum is simply dummy text of the printing and typesetting industry's.
      Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    })
    public text: string;

    @ApiProperty({
      description: 'Text announcing the publication, requiered for post with type: text',
      example: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
      making it look like readable English.`
    })
    public announcement: string;

    @ApiProperty({
      description: 'Unique ID of the quoted author, requiered for post with type: quote',
      example: 'c04fcf4b-400c-4f45-8318-e6e692266f55',
    })
    public quoteAuthorId: string;

    @ApiProperty({
      description: 'URL for video content, requiered for post with type: video',
      example: 'https://www.youtube.com/watch?v=JxS5E-kZc2s'
    })
    public videoUrl: string;

    @ApiProperty({
      description: 'Type of post',
      example: PostTypes.Video
    })
    public type: PostTypes.Link | PostTypes.Photo | PostTypes.Quote | PostTypes.Text | PostTypes.Video;
}
