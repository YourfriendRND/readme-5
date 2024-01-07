import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRDO {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '42'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Anton'
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @Expose()
  public lastName: string;

  @ApiProperty({
    description: 'User avatart url',
    example: 'http:localhost:3000/api/user/avatar/123'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User followers count',
    example: '10'
  })
  @Expose()
  public followers: number;

  @ApiProperty({
    description: 'User posts count',
    example: '15'
  })
  @Expose()
  public posts: number;

}
