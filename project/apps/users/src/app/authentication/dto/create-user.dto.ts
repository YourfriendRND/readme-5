import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User email for identification, it should be uniq',
    example: 'user@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Anton'
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastName: string;
  
  @ApiProperty({
    description: 'Password for entree in account',
    example: 'A123!@qwe'
  })
  public password: string;
}
