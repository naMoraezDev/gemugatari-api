import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { FirebaseService } from 'src/integrations/firebase/firebase.service';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Module({
  exports: [UserProfileService],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository, FirebaseService],
})
export class UserProfileModule {}
