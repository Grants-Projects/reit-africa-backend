require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  User
} from '../models';
import {
  User1668791714716,
} from '../database/migrations';


export const AppDataSource = new DataSource({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'marvelous',
  password: process.env.MYSQL_PASSWORD || 'marvelous',
  database: process.env.MYSQL_DATABASE || 'reit_africa',
  synchronize: false,
  migrationsRun: true,
  type: 'mysql',
  logging: true,
  entities: [
    User
  ],
  migrations: [
    User1668791714716,
  ],
  // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
