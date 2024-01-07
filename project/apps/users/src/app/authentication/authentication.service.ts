import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import {
  CONFLICT_USER_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  UNAUTHORIZED_USER_MESSAGE
} from './authentication.constants';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register({email, password, firstName, lastName}: CreateUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(CONFLICT_USER_MESSAGE)
    }

    const createdUser = {
      passwordHash: '',
      followers: 0,
      posts: 0,
      avatar: '',
      email,
      firstName,
      lastName,
    };

    const userEntity = await new UserEntity(createdUser).setPassword(password);

    return await this.userRepository.save(userEntity);
  }

  public async verifyUser({email, password}: LoginUserDTO): Promise<UserEntity> {

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(NOT_FOUND_USER_MESSAGE);
    }

    const isPasswordCorrect = await existUser.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(UNAUTHORIZED_USER_MESSAGE)
    }

    return existUser;
  }

  public async getUser(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }

}
