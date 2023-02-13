import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  Get,
  Req,
  UseGuards, ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { getAccessTokenDecorator } from '../decorators/getAccessToken.decorator';

@UsePipes(new ValidationPipe({transform: true}))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto)
    const user = await this.authService.register(createUserDto);

    if (!user) {
      throw new HttpException("User cant be created", HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  public async logout(@getAccessTokenDecorator() token) {
    return await this.authService.logout(token);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  public async getUserSelf(@Req() req: any) {
    return req.user;
  }
}
