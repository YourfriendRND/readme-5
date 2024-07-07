import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { TagValidationParams, TAG_IS_NOT_VALID, TAG_LENGTH_IS_NOT_VALID } from '@project/shared/constants';


export class CreatedTagDTO {
    @ApiProperty({
        description: 'The name of created tag',
        example: 'buyandsell'
    })
    @IsNotEmpty()
    @IsString({ message: TAG_IS_NOT_VALID })
    @Length(TagValidationParams.TagMinLength, TagValidationParams.TagMaxLength, { message: TAG_LENGTH_IS_NOT_VALID })
    public name!: string
}
