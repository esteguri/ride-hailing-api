import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RidesModule } from './rides/rides.module';
import { DriversModule } from './drivers/drivers.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    RidesModule,
    DriversModule,
    CommonModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
