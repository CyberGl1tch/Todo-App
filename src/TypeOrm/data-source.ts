import { DataSource } from 'typeorm';
import { OrmconfigModule } from '../ConfigLoaders/ormconfig.module.js';

export const AppDataSource = new DataSource(
  new OrmconfigModule().get(process.env.TYPEORM_DB),
);
//export const AppDataSourceOpportunities = new DataSource(new OrmconfigModule().get("opportunities"));
