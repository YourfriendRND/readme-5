import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentDTO, UpdateCommentDTO } from '@project/shared/dto';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { NOT_FOUND_COMMENT_MESSAGE } from './comment.constants';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async createComment(
    postId: string,
    dto: CommentDTO
  ): Promise<CommentEntity> {
    const createdComment = new CommentEntity(dto);
    await this.commentRepository.save(createdComment, postId);
    return createdComment;
  }

  public async findComments(postId: string, limit: number, page: number): Promise<CommentEntity[]> {
    const comments = await this.commentRepository.find(postId, limit, page);
    return comments;
  }

  public async findCommentById(id: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(id);
    
    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} not found`)
    }

    return comment;
  }

  public async deleteComment(id: string, postId: string): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`${NOT_FOUND_COMMENT_MESSAGE} id: ${id}`);
    }

    await this.commentRepository.delete(id, postId);

  }

  public async updateComment(dto: UpdateCommentDTO): Promise<CommentEntity> {
    const comment = new CommentEntity(dto);

    const updatedComment = await this.commentRepository.update(dto.id, comment);

    return updatedComment;
  }

}
