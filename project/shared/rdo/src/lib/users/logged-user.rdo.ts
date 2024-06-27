import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRDO {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '42',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Access token for entree in close part of application',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.z-tMl0cI2pVUzKHXuSBoza45Fe5Se7i2uyjRCBKarIQ',
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T6NIBnnbCBTdBrBvG0GnAA3V5rtvDa9kVwfR4e3R4Yo'
  })
  @Expose()
  public refreshToken!: string;

}
