import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  public execute(): void {
    console.log('SeedService.execute()');
  }
}
