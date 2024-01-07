import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRDO {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '42',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@mail.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token for entree in close part of application',
    example: 'user@mail.ru',
  })
  @Expose()
  public accessToken: string;

}
