import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: true,
      synchronize: false,
      logger: 'simple-console',
      keepConnectionAlive: true,
      migrationsTableName: 'migration',
      migrationsRun: true,
      entities: [
        __dirname + '/../database/entity/*.entity.ts',
        __dirname + '/../database/entity/*.entity.js',
      ],
      migrations: [
        __dirname + '/../database/migration/*.ts',
        __dirname + '/../database/migration/*.js',
      ],
    //   cli: {
    //     migrationsDir: 'src/database/migration',
    //   },

      ssl:
        process.env.DB_SSL == 'production'
          ? {
              rejectUnauthorized: false,
              // ca: process.env.CA_CERT,
              ca: process.env.CA_DB,
            }
          : false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);


export { configService };

