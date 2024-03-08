import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString, Length, IsOptional} from 'class-validator';
import { ValidationParams, TAG_IS_NOT_VALID, TAG_LENGTH_IS_NOT_VALID } from '../tag.constants';

export class TagDTO {
    @ApiProperty({
        description: 'The Uniq Id of tag',
        example: 'c87b9c2e-eac3-4566-af41-92cd529b1567'
    })
    @IsNotEmpty()
    @IsUUID('all')
    public id: string
  
    @ApiProperty({
      description: 'The name of created tag',
      example: 'buyandsell'
    })
    @IsOptional()
    @IsString({ message: TAG_IS_NOT_VALID })
    @Length(ValidationParams.TagMinLength, ValidationParams.TagMaxLength, { message: TAG_LENGTH_IS_NOT_VALID })
    public name: string;
}
