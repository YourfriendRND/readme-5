import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDTO } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { NOT_FOUND_COMMENT_MESSAGE } from './comment.constants';
import { DEFAULT_LIMIT_ENTITIES } from '@project/shared/constants';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async createComment(
    dto: CommentDTO
  ): Promise<CommentEntity> {
    const createdComment = new CommentEntity(dto);
    await this.commentRepository.save(createdComment);
    return createdComment;
  }

  public async findComments(postId: string, limit?: string): Promise<CommentEntity[]> {
    const commentCount = Number(limit) ? Number(limit) : DEFAULT_LIMIT_ENTITIES;
    const comments = await this.commentRepository.find(postId, commentCount);
    return comments;
  }

  public async deleteComment(id: string): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`${NOT_FOUND_COMMENT_MESSAGE} id: ${id}`);
    }

    await this.commentRepository.deleteById(id);

  }

}
