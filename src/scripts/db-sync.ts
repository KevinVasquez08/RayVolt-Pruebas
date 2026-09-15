import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const syncDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'app_db',
  entities: [],
  synchronize: true, // Solo se activa explícitamente en este script aislado
  logging: true,
});

async function runSync() {
  try {
    console.log('Conectando a la base de datos para sincronizar el esquema...');
    await syncDataSource.initialize();
    console.log('✅ Sincronización de tablas completada exitosamente.');
    await syncDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la sincronización de la base de datos:', error);
    process.exit(1);
  }
}

runSync();