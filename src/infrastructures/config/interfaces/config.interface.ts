export interface Config {
  server: ServerConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
}

enum typeDatabase {
  MYSQL ='mysql',
  POSTGRES = 'postgres',
  SQLSERVER = 'mssql'
}

export interface DatabaseConfig {
  dialect: typeDatabase;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  //define: OptionsDatabase;
  dialectOptions: DialectOptions;
  pathEntities: string;
  autoLoadEntities: boolean;
}

export interface DialectOptions {
  encrypt: boolean; 
  trustServerCertificate: boolean; 
  server: string;
}

export interface ServerConfig {
  port: number; 
  nodeenv: string;
  globalpipe: GlobalPipeConfig;
}

// export interface OptionsDatabase {
//   freezeTableName: boolean;
//   createdAt: boolean;
//   updatedAt: boolean;
// }

export interface AuthConfig {
  jwt: JWTConfig;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
}

export interface GlobalPipeConfig {
  whitelist: boolean;
  forbidNonWhitelisted: boolean; 
  transform: boolean;
}
