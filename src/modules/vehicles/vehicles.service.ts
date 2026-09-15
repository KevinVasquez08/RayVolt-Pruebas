import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create({
      ...createVehicleDto,
      batteryCapacityKwh: createVehicleDto.batteryCapacityKwh?.toString(),
      maxAcPowerKw: createVehicleDto.maxAcPowerKw?.toString(),
      maxDcPowerKw: createVehicleDto.maxDcPowerKw?.toString(),
    });
    return this.vehiclesRepository.save(vehicle);
  }

  findAllByUser(userId: string): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByUser(id: string, userId: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id, userId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async update(
    id: string,
    userId: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findOneByUser(id, userId);
    Object.assign(vehicle, updateVehicleDto);
    return this.vehiclesRepository.save(vehicle);
  }

  async remove(id: string, userId: string): Promise<void> {
    const vehicle = await this.findOneByUser(id, userId);
    await this.vehiclesRepository.remove(vehicle);
  }
}