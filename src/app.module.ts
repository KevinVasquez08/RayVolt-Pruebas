import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleModule } from './integration/google/google.module';
import { AppleModule } from './integration/apple/apple.module';
import jwtConfig from './config/jwt.config';
import databaseConfig from './config/database.config';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    GoogleModule,
    AppleModule,
    VehiclesModule,
  ],
})
export class AppModule {}