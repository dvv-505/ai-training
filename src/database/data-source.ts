import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
}); 