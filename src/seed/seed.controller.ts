import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from 'src/auth/guards/auth.guard';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Post()
  seed() {
    return this.seedService.execute();
  }
}
