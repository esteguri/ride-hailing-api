import { Controller, Post, Body, Request, Param, Get } from '@nestjs/common';
import { RidesService } from './rides.service';
import { LocationDto } from './dto/location.dto';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Get()
  findAll() {
    return this.ridesService.findAll();
  }

  @Post('start')
  startRide(@Request() req, @Body() locationDto: LocationDto) {
    return this.ridesService.startRide(req.user.id, locationDto);
  }

  @Post(':id/complete')
  completeRide(
    @Request() req,
    @Body() locationDto: LocationDto,
    @Param('id') rideId: string,
  ) {
    return this.ridesService.completeRide(req.user.id, rideId, locationDto);
  }
}
