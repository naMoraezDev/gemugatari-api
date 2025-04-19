import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateLikedDto } from './dtos/update-likes.dto';
import { UserProfile } from './models/user-profile.model';
import { UpdateFavoritedDto } from './dtos/update-favorites.dto';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async createUserProfile(
    uid: string,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const existingProfile = await this.findProfileByEmail(
      createUserProfileDto.email,
    );

    if (existingProfile && existingProfile.uid !== uid) {
      throw new BadRequestException('Email is already in use');
    }

    const profileData: UserProfile = {
      uid,
      name: createUserProfileDto.name,
      email: createUserProfileDto.email,
      phone: createUserProfileDto.phone || '',
      liked: [],
      favorited: [],
    };

    return this.userProfileRepository.create(profileData);
  }

  async updateUserProfile(
    uid: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    await this.getUserProfileOrFail(uid);

    if (updateUserProfileDto.email) {
      const existingProfile = await this.findProfileByEmail(
        updateUserProfileDto.email,
      );
      if (existingProfile && existingProfile.uid !== uid) {
        throw new BadRequestException('Email is already in use');
      }
    }

    const updateData: Partial<UserProfile> = {};

    if (updateUserProfileDto.name !== undefined) {
      updateData.name = updateUserProfileDto.name;
    }

    if (updateUserProfileDto.email !== undefined) {
      updateData.email = updateUserProfileDto.email;
    }

    if (updateUserProfileDto.phone !== undefined) {
      updateData.phone = updateUserProfileDto.phone;
    }

    return this.userProfileRepository.update(uid, updateData);
  }

  async getUserProfile(uid: string): Promise<UserProfile> {
    try {
      return await this.userProfileRepository.get(uid);
    } catch (error) {
      const defaultProfile: UserProfile = {
        uid,
        name: '',
        email: '',
        phone: '',
        liked: [],
        favorited: [],
      };

      return this.userProfileRepository.create(defaultProfile);
    }
  }

  async updateLiked(
    uid: string,
    updateLikesDto: UpdateLikedDto,
  ): Promise<UserProfile> {
    const profile = await this.getUserProfileOrFail(uid);
    const updatedLiked = this.calculateUpdatedLiked(
      profile.liked || [],
      updateLikesDto,
    );

    return this.userProfileRepository.update(uid, {
      liked: updatedLiked,
    });
  }

  async updateFavorited(
    uid: string,
    updatedFavoritedDto: UpdateFavoritedDto,
  ): Promise<UserProfile> {
    const profile = await this.getUserProfileOrFail(uid);
    const updatedLiked = this.calculateUpdatedFavorited(
      profile.favorited || [],
      updatedFavoritedDto,
    );

    return this.userProfileRepository.update(uid, {
      liked: updatedLiked,
    });
  }

  private async getUserProfileOrFail(uid: string): Promise<UserProfile> {
    try {
      return await this.userProfileRepository.get(uid);
    } catch (error) {
      throw new NotFoundException('User profile not found');
    }
  }

  private async findProfileByEmail(email: string): Promise<UserProfile | null> {
    return this.userProfileRepository.findByEmail(email);
  }

  private calculateUpdatedLiked(
    currentLiked: string[],
    updateLikesDto: UpdateLikedDto,
  ): string[] {
    let updatedLiked = [...currentLiked];

    if (updateLikesDto.addLiked?.length) {
      const newItems = updateLikesDto.addLiked.filter(
        (itemId) => !updatedLiked.includes(itemId),
      );
      updatedLiked.push(...newItems);
    }

    if (updateLikesDto.deleteLiked?.length) {
      updatedLiked = updatedLiked.filter(
        (itemId) => !updateLikesDto.deleteLiked?.includes(itemId),
      );
    }

    return updatedLiked;
  }

  private calculateUpdatedFavorited(
    currentFavorited: string[],
    updateFavoritedDto: UpdateFavoritedDto,
  ): string[] {
    let updatedFavorited = [...currentFavorited];

    if (updateFavoritedDto.addLFavorite?.length) {
      const newItems = updateFavoritedDto.addLFavorite.filter(
        (itemId) => !updatedFavorited.includes(itemId),
      );
      updatedFavorited.push(...newItems);
    }

    if (updateFavoritedDto.deleteFavorite?.length) {
      updatedFavorited = updatedFavorited.filter(
        (itemId) => !updateFavoritedDto.deleteFavorite?.includes(itemId),
      );
    }

    return updatedFavorited;
  }
}
