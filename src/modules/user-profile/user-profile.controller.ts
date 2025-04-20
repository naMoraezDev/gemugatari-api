import {
  Get,
  Body,
  Post,
  Patch,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateLikedDto } from './dtos/update-likes.dto';
import { UserProfileService } from './user-profile.service';
import { UpdateFavoritedDto } from './dtos/update-favorites.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FirebaseAuthGuard } from 'src/common/guards/firebase.guard';
import { CreateUserProfileDto } from './dtos/create-user-profile.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { UserProfileResponseDto } from './dtos/user-profile-response.dto';
import { FirebaseUser } from 'src/integrations/firebase/firebase.interface';
import { ApiResponseDecorator } from 'src/common/decorators/api-response.decorator';

@ApiTags('user profile')
@Controller('user/profile')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create user profile',
    description:
      'Creates a profile for the user who owns the provided token. If a profile already exists, returns the existing profile.',
  })
  @ApiResponseDecorator({ type: UserProfileResponseDto, status: 201 })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already registered or invalid data',
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  async createUserProfile(
    @CurrentUser() user: FirebaseUser,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userProfileService.createUserProfile(
      user.uid,
      createUserProfileDto,
    );
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates the profile of the user who owns the provided token.',
  })
  @ApiResponseDecorator({ type: UserProfileResponseDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already registered or invalid data',
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User profile not found',
  })
  async updateUserProfile(
    @CurrentUser() user: FirebaseUser,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfileService.updateUserProfile(
      user.uid,
      updateUserProfileDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user profile',
    description:
      'Retrieves the profile of the user who owns the provided token.',
  })
  @ApiResponseDecorator({ type: UserProfileResponseDto })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  async getUserProfile(@CurrentUser() user: FirebaseUser) {
    return this.userProfileService.getUserProfile(user.uid);
  }

  @Patch('liked')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user liked items',
    description:
      'Adds or removes item IDs from the liked items list of the user who owns the provided token. The addLiked list will add and the deleteLiked list will remove the provided IDs from the user profile.',
  })
  @ApiResponseDecorator({ type: UserProfileResponseDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User profile not found',
  })
  async updateLiked(
    @CurrentUser() user: FirebaseUser,
    @Body() updateLikesDto: UpdateLikedDto,
  ) {
    return this.userProfileService.updateLiked(user.uid, updateLikesDto);
  }

  @Patch('favorited')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user favorited items',
    description:
      'Adds or removes item IDs from the favorited items list of the user who owns the provided token. The addFavorited list will add and the deleteFavorited list will remove the provided IDs from the user profile.',
  })
  @ApiResponseDecorator({ type: UserProfileResponseDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User profile not found',
  })
  async updateFavorited(
    @CurrentUser() user: FirebaseUser,
    @Body() updateLikesDto: UpdateFavoritedDto,
  ) {
    return this.userProfileService.updateFavorited(user.uid, updateLikesDto);
  }
}
