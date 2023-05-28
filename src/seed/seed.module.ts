import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { DriversModule } from 'src/drivers/drivers.module';
import { UsersModule } from 'src/users/users.module';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DriversModule, UsersModule, ParametersModule],
})
export class SeedModule {}
