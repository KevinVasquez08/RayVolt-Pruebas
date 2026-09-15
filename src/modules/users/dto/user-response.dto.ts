import { UserStatus } from '../enums/user-status.enum';
import { RoleResponseDto } from './role-response.dto';

export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  roles: RoleResponseDto[];
  status: UserStatus;
  emailVerifiedAt: Date | null;
  createdAt: Date;

  static fromEntity(user: any): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.fullName = user.fullName;
    dto.phone = user.phone;
    dto.roles = (user.roles || []).map((role: any) =>
      RoleResponseDto.fromEntity(role),
    );
    dto.status = user.status;
    dto.emailVerifiedAt = user.emailVerifiedAt;
    dto.createdAt = user.createdAt;
    return dto;
  }
}