import { Vehicle } from '../../modules/vehicles/entities/vehicle.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Role } from '../../modules/users/entities/role.entity';
import { AuthIdentity } from '../../modules/auth/entities/auth-identity.entity';
import { RefreshToken } from '../../modules/auth/entities/refresh-token.entity';
import { DeviceToken } from '../../modules/auth/entities/device-token.entity';

export const entities = [
	User,
	Role,
	AuthIdentity,
	RefreshToken,
	DeviceToken,
	Vehicle,
];

export { User, Role, AuthIdentity, RefreshToken, DeviceToken, Vehicle };