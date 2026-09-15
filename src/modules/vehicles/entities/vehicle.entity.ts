import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
	@Column({ type: 'uuid', name: 'user_id' })
	userId: string;

	@Column({ type: 'varchar', nullable: true })
	alias: string | null;

	@Column({ type: 'varchar' })
	make: string;

	@Column({ type: 'varchar' })
	model: string;

	@Column({ type: 'integer', name: 'model_year', nullable: true })
	modelYear: number | null;

	@Column({ type: 'varchar', name: 'license_plate', nullable: true })
	licensePlate: string | null;

	@Column({ type: 'decimal', name: 'battery_capacity_kwh', nullable: true })
	batteryCapacityKwh: string | null;

	@Column({ type: 'decimal', name: 'max_ac_power_kw', nullable: true })
	maxAcPowerKw: string | null;

	@Column({ type: 'decimal', name: 'max_dc_power_kw', nullable: true })
	maxDcPowerKw: string | null;

	@Column({ type: 'boolean', name: 'is_default', default: false })
	isDefault: boolean;
}