import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';
import { PrismaClientModule } from '@project/shared/config/blog';

@Module({
  imports: [PrismaClientModule],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [],
})
export class TagModule {}
