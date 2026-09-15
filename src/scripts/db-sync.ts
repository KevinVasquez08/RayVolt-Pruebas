import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { entities, Role } from '../database/entities';

dotenv.config();

const syncDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'app_db',
  entities,
  synchronize: true, // Solo se activa explícitamente en este script aislado
  logging: true,
});

const DEFAULT_ROLES = [
  { name: 'ADMIN', description: 'Administrador con acceso total al sistema' },
  { name: 'USER', description: 'Usuario estándar de la aplicación' },
  { name: 'OPERATOR', description: 'Operador con permisos intermedios' },
];

async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);

  for (const roleData of DEFAULT_ROLES) {
    const existingRole = await roleRepository.findOne({
      where: { name: roleData.name },
    });

    if (!existingRole) {
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
      console.log(`  ➕ Rol '${roleData.name}' creado.`);
    } else {
      console.log(`  ✔️ Rol '${roleData.name}' ya existe, se omite.`);
    }
  }
}

async function runSync() {
  try {
    console.log('Conectando a la base de datos para sincronizar el esquema...');
    await syncDataSource.initialize();
    console.log('✅ Sincronización de tablas completada exitosamente.');

    console.log('Sembrando roles básicos...');
    await seedRoles(syncDataSource);
    console.log('✅ Seeding de roles completado.');

    await syncDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la sincronización de la base de datos:', error);
    process.exit(1);
  }
}

runSync();