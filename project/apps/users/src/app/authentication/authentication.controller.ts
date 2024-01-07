import { Body, Controller, Get, Post, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse} from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { fillDTO } from '@project/shared/helpers';
import { UserRDO } from './rdo/user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { CONFLICT_USER_MESSAGE, NOT_FOUND_USER_MESSAGE, UNAUTHORIZED_USER_MESSAGE } from './authentication.constants';

@ApiTags('authetication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

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
    dto: CreateUserDTO
  ): Promise<UserRDO> {
    const user = await this.authService.register(dto);
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
  @Post('login')
  public async login(
    @Body()
    dto: LoginUserDTO
  ): Promise<LoggedUserRDO> {
    const verifyUser = await this.authService.verifyUser(dto);
    return fillDTO(LoggedUserRDO, verifyUser.toPOJO());
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
  @Get(':id')
  public async show(@Param('id') id: string): Promise<UserRDO> {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRDO, existUser.toPOJO());
  }
}
