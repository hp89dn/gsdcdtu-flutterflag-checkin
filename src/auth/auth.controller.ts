import { Request } from 'express';
import _get from 'lodash/get';
import _set from 'lodash/set';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

interface Session {
  user_id: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login/google')
  async loginWithGoogle(
    @Body() loginAuthDto: LoginAuthDto,
    @Req() req: Request,
  ) {
    if (!loginAuthDto.id_token)
      throw new BadRequestException('Id token not provided');

    const user = await this.authService
      .loginWithGoogle(loginAuthDto)
      .catch(() => {
        throw new BadRequestException(
          'Firebase ID token has invalid signature',
        );
      });

    _set(req, 'session.user_id', user.id);
    return user;
  }

  @Get('/verify')
  async validateById(@Req() req: Request) {
    const user_id = _get(req, 'session.user_id', '');

    if (!user_id) throw new UnauthorizedException('Invalid user');

    return await this.authService.validateById(user_id).catch(() => {
      throw new UnauthorizedException('Invalid user');
    });
  }

  @Get('/logout')
  async logout(@Req() req: Request) {
    return 'logout successful';
  }
}
