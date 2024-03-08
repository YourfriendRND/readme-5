import { ConflictException, Injectable, NotFoundException, UnauthorizedException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, Token, UserInterface } from '@project/shared/types';
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
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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
    const user =  await this.userRepository.findById(id);
    
    if (!user) {
      throw new NotFoundException(`User with id: ${id} - not found`);
    }

    return user;
  }

  public async createUserToken(user: UserInterface): Promise<Token> {
    try {
      const payload: TokenPayload = {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
  
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (err) {
      this.logger.error(`[Token generate error]: ${err.message}`);
      throw new HttpException(`Error while token creation`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}


