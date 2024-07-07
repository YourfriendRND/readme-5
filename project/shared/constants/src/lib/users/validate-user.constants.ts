export const ValidationParams = {
    UserNameMinLength: 3,
    UserNameMaxLength: 50,
    UserPasswordMinLength: 6,
    UserPasswordMaxLength: 12
}

export const CONFLICT_USER_MESSAGE = 'User with this email already exist';

export const UNAUTHORIZED_USER_MESSAGE = 'User email or password is wrong';

export const NOT_FOUND_USER_MESSAGE = 'User not found';

export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';

export const FIRST_NAME_NOT_VALID = 'The First name must be a string';

export const LAST_NAME_NOT_VALID = 'The Last name must be a string';

export const NAME_LENGTH_NOT_VALID = `The First name must be string from ${ValidationParams.UserNameMinLength} to ${ValidationParams.UserNameMaxLength} chars`;

export const LAST_NAME_LENGTH_NOT_VALID = `The Last name must be string from ${ValidationParams.UserNameMinLength} to ${ValidationParams.UserNameMaxLength} chars`;

export const PASSWORD_LENGTH_NOT_VALID = `The Password must be string from ${ValidationParams.UserPasswordMinLength} to ${ValidationParams.UserPasswordMaxLength} chars`;

export const PASSWORD_NOT_VALID = 'The Password must be a string'
