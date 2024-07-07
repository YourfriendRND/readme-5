import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { 
    AUTH_USER_EMAIL_NOT_VALID,
    PASSWORD_LENGTH_NOT_VALID,
    PASSWORD_NOT_VALID,
    ValidationParams
} from '@project/shared/constants';

export class LoginUserDTO {
    
    @ApiProperty({
        description: 'User email for entree in account',
        example: 'user@mail.ru',
        type: String
    })
    @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
    public email!: string;

    @ApiProperty({
        description: 'User password for entree in account',
        example: 'A123!@qwe'
    })
    @IsString({ message: PASSWORD_NOT_VALID })
    @Length(ValidationParams.UserPasswordMinLength, ValidationParams.UserPasswordMaxLength, { message: PASSWORD_LENGTH_NOT_VALID })
    public password!: string;

}
