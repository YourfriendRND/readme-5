export const ValidationParams = {
    PostNameMinLength: 20,
    PostNameMaxLength: 50,
    TagMaxCount: 8,
    PostTextMinLength: 100,
    PostTextMaxLength: 1024,
    PostAnnoncementMinLength: 50,
    PostAnnoncementMaxLength: 255,
    PostQuoteTextMinLength: 20,
    PostQuoteTextMaxLength: 300,
}

export enum PostStatuses {
    Published = 'published',
    Draft = 'draft',
}

export const MAX_LIMIT_POST_ON_PAGE = 25;

export const POST_NAME_REQUIRED = 'The post name is required';

export const POST_NAME_NOT_VALID = 'Post name must be a string';

export const POST_NAME_LENGTH_NOT_VALID = `The post name must be a string from ${ValidationParams.PostNameMinLength} to ${ValidationParams.PostNameMaxLength} chars`;

export const POST_NOT_FOUND = 'Post not found';

export const TAG_LIMIT_NOT_VALID = `The max count of tags for post should be ${ValidationParams.TagMaxCount}`;

export const POST_TEXT_NOT_VALID = 'The post text must be a string';

export const POST_TEXT_LENGTH_NOT_VALID = `The post text must be a string from ${ValidationParams.PostTextMinLength} to ${ValidationParams.PostTextMaxLength} chars`;

export const POST_ANNOUNCEMENT_NOT_VALID = 'The post announcement must be a string';

export const POST_ANNOUNCEMENT_LENGTH_NOT_VALID = `The post announcement must be a string from ${ValidationParams.PostAnnoncementMinLength} to ${ValidationParams.PostAnnoncementMaxLength} chars`;

export const POST_QUOTE_AUTHOR_ID_NOT_VALID = 'The quote author id must be correct';

export const POST_QUOTE_TEXT_NOT_VALID = 'The quote text must be a string';

export const POST_QUOTE_TEXT_LENGTH_NOT_VALID = `The quote text must be a string from ${ValidationParams.PostQuoteTextMinLength} to ${ValidationParams.PostQuoteTextMaxLength} chars`;
