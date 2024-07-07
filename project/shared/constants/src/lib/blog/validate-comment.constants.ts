export const commentValidationParams = {
    CommentMinLength: 10,
    CommentMaxLength: 300,
}

export const COMMENT_ID_NOT_VALID = 'Comment id must be a valid UUID';

export const NOT_FOUND_COMMENT_MESSAGE = 'Comment not found'

export const COMMENT_NOT_VALID = 'Comment must be a string';

export const COMMENT_LENGTH_NOT_VALID = `Comment must be a string from ${commentValidationParams.CommentMinLength} to ${commentValidationParams.CommentMaxLength} chars`;

export const COMMENT_TO_POST_ID_NOT_VALID = 'Post id must be valid UUID';

export const COMMENT_AUTHOR_ID_NOT_VALID = 'The comment author id must be correct';
