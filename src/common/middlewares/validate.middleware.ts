import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { get } from 'lodash';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class VaidateMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const user_id = get(req, 'session.user_id', '');
    if (!user_id) throw new UnauthorizedException('not logged in');
    const user = await this.authService.validateById(user_id).catch(() => {
      throw new UnauthorizedException('invalid user');
    });

    req.user = user;
    next();
  }
}
