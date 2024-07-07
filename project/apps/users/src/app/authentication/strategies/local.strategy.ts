import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UserInterface } from '@project/shared/types';

const USER_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthenticationService
    ) {
        super({ usernameField: USER_FIELD_NAME })
    }

    public async validate(email: string, password: string): Promise<UserInterface> {
        return await this.authService.verifyUser({ email, password })
    }

}