import { FirebaseModule } from 'src/firebase/firebase.module';

import { Module } from '@nestjs/common';

import { UsersService } from './users.service';

@Module({
  imports: [FirebaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
