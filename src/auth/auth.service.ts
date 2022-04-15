import { FirebaseService } from 'src/firebase/firebase.service';

import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
  ) {}

  async loginWithGoogle(loginAuthDto: UpdateAuthDto) {
    const res = await this.firebaseService
      .getAuth()
      .verifyIdToken(loginAuthDto.id_token);

    const user = await this.usersService.findByEmail(res.email);

    if (user) return user;

    const USER = {
      name: res.name,
      email: res.email,
      roles: ['user'],
    };

    const newUser = await this.usersService.create(USER);

    return newUser;
  }

  async validateById(id: string) {
    return await this.usersService.findById(id);
  }
}
