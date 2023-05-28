import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parameter } from './entities/parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
