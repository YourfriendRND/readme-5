import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import {
  ValidationParams,
  AUTH_USER_EMAIL_NOT_VALID,
  NAME_LENGTH_NOT_VALID,
  LAST_NAME_LENGTH_NOT_VALID,
  LAST_NAME_NOT_VALID,
  FIRST_NAME_NOT_VALID,
  PASSWORD_LENGTH_NOT_VALID,
  PASSWORD_NOT_VALID
} from '../authentication.constants'

export class CreateUserDTO {
  @ApiProperty({
    description: 'User email for identification, it should be uniq',
    example: 'user@mail.ru'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Anton'
  })
  @IsString({ message: FIRST_NAME_NOT_VALID })
  @Length(ValidationParams.UserNameMinLength, ValidationParams.UserNameMaxLength, { message: NAME_LENGTH_NOT_VALID })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString({ message: LAST_NAME_NOT_VALID })
  @Length(ValidationParams.UserNameMinLength, ValidationParams.UserNameMaxLength, { message: LAST_NAME_LENGTH_NOT_VALID })
  public lastName: string;
  
  @ApiProperty({
    description: 'Password for entree in account',
    example: 'A123!@qwe'
  })
  @IsString({ message: PASSWORD_NOT_VALID })
  @Length(ValidationParams.UserPasswordMinLength, ValidationParams.UserPasswordMaxLength, { message: PASSWORD_LENGTH_NOT_VALID })
  public password: string;
}
