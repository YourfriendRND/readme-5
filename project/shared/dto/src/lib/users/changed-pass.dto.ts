import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ValidationParams, PASSWORD_NOT_VALID, PASSWORD_LENGTH_NOT_VALID } from '@project/shared/constants';

export class ChangedPasswordDTO {
    @ApiProperty({
        description: `The current user's password`,
        example: '@dmlomd#1224',
        type: String,
        required: true
    })
    @IsString({ message: PASSWORD_NOT_VALID })
    @Length(ValidationParams.UserPasswordMinLength, ValidationParams.UserPasswordMaxLength, { message: PASSWORD_LENGTH_NOT_VALID })
    @IsNotEmpty()
    public currentPassword!: string;

    @ApiProperty({
        description: `New user's password`,
        example: '091#4%332Jk',
        type: String,
        required: true,
    })
    @IsString({ message: PASSWORD_NOT_VALID })
    @Length(ValidationParams.UserPasswordMinLength, ValidationParams.UserPasswordMaxLength, { message: PASSWORD_LENGTH_NOT_VALID })
    @IsNotEmpty()
    public password!: string;

}
