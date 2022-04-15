import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ParticipantModule } from './participants/participants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    ParticipantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
