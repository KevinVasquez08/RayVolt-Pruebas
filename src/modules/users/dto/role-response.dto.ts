export class RoleResponseDto {
  id: string;
  name: string;
  description: string | null;

  static fromEntity(role: any): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = role.id;
    dto.name = role.name;
    dto.description = role.description;
    return dto;
  }
}