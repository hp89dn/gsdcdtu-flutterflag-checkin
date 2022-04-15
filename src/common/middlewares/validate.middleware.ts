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
   
    next();
  }
}
