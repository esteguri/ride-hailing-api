import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  public async get(key: ParametersKey) {
    const parameter = await this.parametersRepository.findOne({
      where: {
        key,
      },
    });

    if (!parameter)
      throw new InternalServerErrorException(`Parameter ${key} not found`);

    return parameter.value;
  }

  public async createAll(parameters: Parameter[]) {
    return await this.parametersRepository.save(parameters);
  }
}
