import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from './enums/user-status.enum';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createLocalUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, phone, password } = createUserDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const defaultRole = await this.getOrCreateDefaultRole();

    const user = this.userRepository.create({
      email: email.toLowerCase().trim(),
      passwordHash,
      fullName,
      phone: phone || null,
      status: UserStatus.PENDING,
      roles: [defaultRole],
    });

    return this.userRepository.save(user);
  }

  private async getOrCreateDefaultRole(): Promise<Role> {
    let role = await this.roleRepository.findOne({
      where: { name: UserRole.USER },
    });

    if (!role) {
      role = this.roleRepository.create({
        name: UserRole.USER,
        description: 'Rol de usuario estándar',
      });
      role = await this.roleRepository.save(role);
    }

    return role;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
      relations: { roles: true },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.firstName || updateUserDto.lastName) {
      const [currentFirst, ...rest] = user.fullName.split(' ');
      const firstName = updateUserDto.firstName || currentFirst;
      const lastName = updateUserDto.lastName || rest.join(' ');
      user.fullName = `${firstName} ${lastName}`.trim();
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email.toLowerCase().trim();
    }

    if (updateUserDto.phone !== undefined) {
      user.phone = updateUserDto.phone;
    }

    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async markEmailAsVerified(id: string): Promise<User> {
    const user = await this.findById(id);
    user.emailVerifiedAt = new Date();
    user.status = UserStatus.ACTIVE;
    return this.userRepository.save(user);
  }

  async assignRole(userId: string, roleName: string): Promise<User> {
    const user = await this.findById(userId);

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new NotFoundException(`El rol '${roleName}' no existe.`);
    }

    const alreadyHasRole = user.roles.some((r) => r.id === role.id);
    if (!alreadyHasRole) {
      user.roles.push(role);
      await this.userRepository.save(user);
    }

    return user;
  }

  async removeRole(userId: string, roleName: string): Promise<User> {
    const user = await this.findById(userId);
    user.roles = user.roles.filter((r) => r.name !== roleName);
    await this.userRepository.save(user);
    return user;
  }
}