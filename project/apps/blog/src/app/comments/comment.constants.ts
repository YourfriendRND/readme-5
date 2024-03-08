export const ValidationParams = {
    CommentMinLength: 10,
    CommentMaxLength: 300,
}

export const NOT_FOUND_COMMENT_MESSAGE = 'Comment not found'

export const COMMENT_NOT_VALID = 'Comment must be a string';

export const COMMENT_LENGTH_NOT_VALID = `Comment must be a string from ${ValidationParams.CommentMinLength} to ${ValidationParams.CommentMaxLength} chars`;

export const COMMENT_TO_POST_ID_NOT_VALID = 'PostId must be valid UUID';

export const COMMENT_AUTHOR_ID_NOT_VALID = 'The comment author id must be correct';

