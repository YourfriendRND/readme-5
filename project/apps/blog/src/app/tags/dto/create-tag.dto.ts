import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDTO {
  @ApiProperty({
    description: 'The name of created tag',
    example: 'buyandsell'
  })
  public name: string;
}
