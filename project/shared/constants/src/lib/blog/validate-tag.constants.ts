export const TagValidationParams = {
    TagMinLength: 3,
    TagMaxLength: 10,
}

export const TAG_IS_NOT_VALID = 'Tag name must be a string';

export const TAG_LENGTH_IS_NOT_VALID = `Tag must be a string from ${TagValidationParams.TagMinLength} to ${TagValidationParams.TagMaxLength} chars`; 
