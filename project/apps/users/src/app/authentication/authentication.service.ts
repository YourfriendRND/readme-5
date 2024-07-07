import { 
  ConflictException, 
  Injectable, 
  NotFoundException, 
  UnauthorizedException, 
  Logger, 
  HttpException, 
  HttpStatus,
  Inject,
  BadRequestException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, UserInterface } from '@project/shared/types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO, CreatedUserDTO, ChangedPasswordDTO } from '@project/shared/dto';
import {
  CONFLICT_USER_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  UNAUTHORIZED_USER_MESSAGE
} from './authentication.constants';
import jwtConfig from 'shared/config/users/src/lib/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/shared/helpers';
import { FollowerService } from '../follower/follower.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly followerService: FollowerService,
  ) {}

  public async register({email, password, firstName, lastName}: CreatedUserDTO): Promise<UserEntity> {
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

    const followers = await this.followerService.countFollowers(user.id);
    user.followers = followers;
    
    return user;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null>  {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async createUserToken(user: UserInterface): Promise<Token & {id: string}> {
    try {
      const accessTokenPayload = createJWTPayload(user);
      const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() }
  
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      return { id: user.id , accessToken, refreshToken };
    } catch (err) {
      this.logger.error(`[Token generate error]: ${err.message}`);
      throw new HttpException(`Error while token creation`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  public async changeUserPassword(userPasswordDto: (ChangedPasswordDTO & UserInterface)): Promise<UserEntity> {
    const user = await this.userRepository.findById(userPasswordDto.id);

    if (!user) {
      throw new NotFoundException(`User with id: ${userPasswordDto.id} not found, impossible to change password`);
    }

    const isPasswordCorrect = await user.comparePassword(userPasswordDto.currentPassword);

    if (!isPasswordCorrect) {
      throw new BadRequestException(`Impossible to change the password, because the current password is incorrect`);
    }

    const updatedUser = await user.setPassword(userPasswordDto.password);

    await this.userRepository.update(user.id, user);

    return updatedUser;

  }
}


