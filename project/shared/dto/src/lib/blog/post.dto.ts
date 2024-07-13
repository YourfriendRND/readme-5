import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  ArrayMaxSize, 
  IsNotEmpty, 
  ValidateIf, 
  IsUrl, 
  Length,
  IsEnum,
  IsMongoId,
  ValidateNested,
  IsArray,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostTypes } from '@project/shared/types';
import { TagDTO } from './tag.dto'
import {
  PostValidationParams,
  POST_NAME_REQUIRED,
  POST_NAME_LENGTH_NOT_VALID,
  POST_NAME_NOT_VALID,
  TAG_LIMIT_NOT_VALID,
  PostStatuses,
  POST_TEXT_NOT_VALID,
  POST_TEXT_LENGTH_NOT_VALID,
  POST_ANNOUNCEMENT_NOT_VALID,
  POST_ANNOUNCEMENT_LENGTH_NOT_VALID,
  POST_QUOTE_AUTHOR_ID_NOT_VALID,
  POST_QUOTE_TEXT_NOT_VALID,
  POST_QUOTE_TEXT_LENGTH_NOT_VALID
} from '@project/shared/constants';

export class PostDTO {

  @ApiProperty({
      description: 'The name of blog post',
      example: 'Good news',
      required: true
  })
  @IsNotEmpty({ message: POST_NAME_REQUIRED })
  @IsString( { message: POST_NAME_NOT_VALID })
  @Length(PostValidationParams.PostNameMinLength, PostValidationParams.PostNameMaxLength, { message: POST_NAME_LENGTH_NOT_VALID })
  public name!: string;

  @ApiProperty({
      description: 'List of tags for post',
      example: []
  })
  @IsArray()
  @ArrayMaxSize(PostValidationParams.TagMaxCount, { message: TAG_LIMIT_NOT_VALID })
  @ValidateNested({ each: true })
  @Type(() => TagDTO)
  @IsOptional()
  public tags?: TagDTO[];

  @ApiProperty({
    description: 'Status of post: draft or published',
    example: 'published'
  })
  @IsEnum(PostStatuses)
  public status!: string;

  @ApiProperty({
    description: 'The Author uniq ID',
    example: '659ac76f8fcee5cc6bd9dee3'
  })
  public authorId!: string;

  @ApiProperty({
    description: 'valid URL, requiered for post with type: link',
    example: 'https://placeholder.com'
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Link)
  @IsUrl()
  public url!: string;

  @ApiProperty({
    description: 'File with photo, valid format - jpg, png, requiered for post with type: photo',
    example: 'selfy.jpg'
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Photo)
  @IsUrl()
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
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Text || post.type === PostTypes.Quote)
  @IsString({ message: POST_TEXT_NOT_VALID })
  @Length(PostValidationParams.PostTextMinLength, PostValidationParams.PostTextMaxLength, { message: POST_TEXT_LENGTH_NOT_VALID })
  public text!: string;

  @ApiProperty({
    description: 'Text announcing the publication, requiered for post with type: text',
    example: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',
    making it look like readable English.`
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Text)
  @IsString({ message: POST_ANNOUNCEMENT_NOT_VALID })
  @Length(PostValidationParams.PostAnnoncementMinLength, PostValidationParams.PostAnnoncementMaxLength, { message: POST_ANNOUNCEMENT_LENGTH_NOT_VALID })
  public announcement!: string;

  @ApiProperty({
    description: 'Unique ID of the quoted author, requiered for post with type: quote',
    example: '659ac76f8fcee5cc6bd9dee3',
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Quote)
  @IsMongoId({ message: POST_QUOTE_AUTHOR_ID_NOT_VALID })
  public quoteAuthorId!: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Example of quote text'
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Quote)
  @IsString({ message: POST_QUOTE_TEXT_NOT_VALID })
  @Length(PostValidationParams.PostQuoteTextMinLength, PostValidationParams.PostQuoteTextMaxLength, { message: POST_QUOTE_TEXT_LENGTH_NOT_VALID })
  public quotedText!: string;

  @ApiProperty({
    description: 'URL for video content, requiered for post with type: video',
    example: 'https://www.youtube.com/watch?v=JxS5E-kZc2s'
  })
  @ValidateIf((post: PostDTO) => post.type === PostTypes.Video)
  @IsUrl()
  public videoUrl!: string;

  @ApiProperty({
    description: 'Type of post',
    example: PostTypes.Video
  })
  @IsNotEmpty()
  @IsEnum(PostTypes)
  public type!: PostTypes.Link | PostTypes.Photo | PostTypes.Quote | PostTypes.Text | PostTypes.Video;
  
}
