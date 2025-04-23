import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/integrations/firebase/firebase.service';

@Injectable()
export class FirebaseHealthIndicator extends HealthIndicatorService {
  constructor(private readonly firebaseService: FirebaseService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.firebaseService.getAuth().listUsers(1);
      return {
        [key]: {
          status: 'up',
        },
      };
    } catch (error) {
      return {
        [key]: {
          status: 'down',
          message: error.message,
          ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
        },
      };
    }
  }
}
