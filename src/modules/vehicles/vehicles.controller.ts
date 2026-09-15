import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
@ApiTags('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un vehículo' })
  @ApiCreatedResponse({ description: 'Vehículo creado correctamente' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vehículos de un usuario' })
  @ApiQuery({ name: 'userId', format: 'uuid', description: 'Propietario de los vehículos' })
  findAll(@Query('userId', ParseUUIDPipe) userId: string) {
    return this.vehiclesService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un vehículo' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiQuery({ name: 'userId', format: 'uuid', description: 'Propietario del vehículo' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.vehiclesService.findOneByUser(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiQuery({ name: 'userId', format: 'uuid', description: 'Propietario del vehículo' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('userId', ParseUUIDPipe) userId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(id, userId, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiQuery({ name: 'userId', format: 'uuid', description: 'Propietario del vehículo' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.vehiclesService.remove(id, userId);
  }
}