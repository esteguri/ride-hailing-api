import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from './entities/parameter.entity';
import { ParametersKey } from 'src/common';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private readonly parametersRepository: Repository<Parameter>,
  ) {}

  public async findAll() {
    return await this.parametersRepository.find();
  }

  public async findByKey(key: ParametersKey) {
    return await this.parametersRepository.findOne({
      where: {
        key,
      },
    });
  }

  public async createAll(parameters: Parameter[]) {
    return await this.parametersRepository.save(parameters);
  }
}
