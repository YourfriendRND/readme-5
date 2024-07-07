import { UserInterface, TokenPayload } from '@project/shared/types';

export function createJWTPayload(user: UserInterface): TokenPayload {
    return {
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
    }
}
