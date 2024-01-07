import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User email for entree in account',
    example: 'user@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password for entree in account',
    example: 'A123!@qwe'
  })
  public password: string;
}
