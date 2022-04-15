import { AuthModule } from 'src/auth/auth.module';
import { VaidateMiddleware } from 'src/common/middlewares/validate.middleware';
import { FirebaseModule } from 'src/firebase/firebase.module';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ParticipantController } from './participants.controller';
import { ParticipantService } from './participants.service';

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VaidateMiddleware)
      .exclude({ path: 'participants', method: 2 })
      .forRoutes('participants');
  }
}
