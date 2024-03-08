import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRDO {
  @ApiProperty({
    example: '6d3f2748-bf4c-4415-85ce-92afec8da509',
    description: 'The Uniq ID of tag',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'buyandsell',
    description: 'The name of tag',
  })
  @Expose()
  public name: string;
}
