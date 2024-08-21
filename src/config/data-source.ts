import * as dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const entitiesPath = join(__dirname, '../entities/*.entity{.ts,.js}');
 
export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'machine_erp',
  entities: [entitiesPath],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  logging: process.env.LOG_LEVEL === 'debug',
};

const dataSource = new DataSource(typeOrmConfig);

export default dataSource;

