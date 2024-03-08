import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import {
  TAG_IS_NOT_VALID,
  TAG_LENGTH_IS_NOT_VALID,
  ValidationParams
} from '../tag.constants';

export class CreateTagDTO {
  @IsNotEmpty()
  @IsUUID('all')
  id: string

  @ApiProperty({
    description: 'The name of created tag',
    example: 'buyandsell'
  })
  @IsString({ message: TAG_IS_NOT_VALID })
  @Length(ValidationParams.TagMinLength, ValidationParams.TagMaxLength, { message: TAG_LENGTH_IS_NOT_VALID })
  public name: string;
}
