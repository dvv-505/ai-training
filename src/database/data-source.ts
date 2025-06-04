import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

config();

// Determine if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: isProduction 
    ? [path.join(__dirname, 'models', '*.js')] 
    : [path.join(__dirname, 'models', '*.ts')],
  migrations: isProduction 
    ? [path.join(__dirname, 'migrations', '*.js')] 
    : [path.join(__dirname, 'migrations', '*.ts')],
  subscribers: [],
}); 