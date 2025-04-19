import { Injectable } from '@nestjs/common';
import { UserProfile } from '../models/user-profile.model';
import { FirebaseService } from 'src/integrations/firebase/firebase.service';

@Injectable()
export class UserProfileRepository {
  private readonly collection: string = 'user-profiles';

  constructor(private readonly firebaseService: FirebaseService) {}

  async create(data: UserProfile): Promise<UserProfile> {
    const now = new Date().toISOString();
    const profileWithTimestamps = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    await this.firebaseService
      .getFirestore()
      .collection(this.collection)
      .doc(data.uid)
      .set(profileWithTimestamps);

    return profileWithTimestamps;
  }

  async update(uid: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await this.firebaseService
      .getFirestore()
      .collection(this.collection)
      .doc(uid)
      .update(updateData);

    return this.get(uid);
  }

  async get(uid: string): Promise<UserProfile> {
    const docRef = this.firebaseService
      .getFirestore()
      .collection(this.collection)
      .doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error('User profile not found');
    }

    return doc.data() as UserProfile;
  }

  async findByEmail(email: string): Promise<UserProfile | null> {
    const snapshot = await this.firebaseService
      .getFirestore()
      .collection(this.collection)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as UserProfile;
  }
}
