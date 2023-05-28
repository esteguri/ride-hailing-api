import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { UsersModule } from 'src/users/users.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { ParametersModule } from 'src/parameters/parameters.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ride]),
    UsersModule,
    DriversModule,
    ParametersModule,
  ],
  providers: [RidesService],
  controllers: [RidesController],
})
export class RidesModule {}
