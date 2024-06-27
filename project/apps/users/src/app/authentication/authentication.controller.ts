import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Param, 
  HttpStatus, 
  UseGuards, 
  Req,
  HttpCode,
  Patch
} from '@nestjs/common';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { fillDTO } from '@project/shared/helpers';
import { CONFLICT_USER_MESSAGE, NOT_FOUND_USER_MESSAGE, UNAUTHORIZED_USER_MESSAGE } from './authentication.constants';
import { MongoIdValidationPipe } from '@project/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../user/user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreatedUserDTO, ChangedPasswordDTO } from '@project/shared/dto';
import { UserRDO, LoggedUserRDO, UpdatedUserRDO, UserTokensRDO  } from '@project/shared/rdo';

type RequestWithUser = {
  user?: UserEntity
}

@ApiTags('authetication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,  
  ) {}

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CONFLICT_USER_MESSAGE,
  })
  @Post('register')
  public async create(
    @Body()
    dto: CreatedUserDTO
  ): Promise<UserRDO> {
    const user = await this.authService.register(dto);
    const { email, firstName, lastName } = user;
    await this.notifyService.registerSubscriber({ email, firstName, lastName });
    return fillDTO(UserRDO, user.toPOJO())
  }

  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: 'User logged successfully'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED_USER_MESSAGE,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req()
    { user }: RequestWithUser
  ): Promise<LoggedUserRDO> {
    const userToken = await this.authService.createUserToken(user);
    return fillDTO(LoggedUserRDO, {
      ...user.toPOJO(),
      ...userToken,
    });
  }

  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'Application user data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_USER_MESSAGE,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string): Promise<UserRDO> {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRDO, existUser.toPOJO());
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(
    @Req() { user }: RequestWithUser
  ): Promise<UserTokensRDO> {
    const tokens = await this.authService.createUserToken(user);
    return fillDTO(UserTokensRDO, { ...tokens });
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async checkUser (
    @Req() { user: payload }: RequestWithUser
  ) {
    return payload;
  }

  @Patch('password/change')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async changedPassword(
    @Req() { user }: RequestWithUser,
    @Body() passChangesDTO: ChangedPasswordDTO,
  ): Promise<UpdatedUserRDO> {
    const updatedUser = await this.authService.changeUserPassword({ ...passChangesDTO, ...user });
    
    const updatedTokens = await this.authService.createUserToken(updatedUser);

    return fillDTO(UpdatedUserRDO, { ...updatedUser.toPOJO(), ...updatedTokens });
  }
}
