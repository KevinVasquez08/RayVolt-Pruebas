import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ format: 'uuid', description: 'Identificador del usuario propietario' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ example: 'Mi Tesla' })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiProperty({ example: 'Model 3' })
  @IsString()
  make: string;

  @ApiProperty({ example: 'Model 3' })
  @IsString()
  model: string;

  @ApiPropertyOptional({ example: 2024, minimum: 1886 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  modelYear?: number;

  @ApiPropertyOptional({ example: 'ABC123' })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiPropertyOptional({ example: 75, description: 'Capacidad de batería en kWh' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  batteryCapacityKwh?: number;

  @ApiPropertyOptional({ example: 11, description: 'Potencia máxima AC en kW' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  maxAcPowerKw?: number;

  @ApiPropertyOptional({ example: 170, description: 'Potencia máxima DC en kW' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  maxDcPowerKw?: number;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
