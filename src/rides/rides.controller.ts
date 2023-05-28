import { Controller, Post, Body, Request, Param } from '@nestjs/common';
import { RidesService } from './rides.service';
import { LocationDto } from './dto/location.dto';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('start')
  startRide(@Request() req, @Body() startRideDto: LocationDto) {
    return this.ridesService.startRide(req.user.id, startRideDto);
  }

  @Post(':id/complete')
  completeRide(
    @Request() req,
    @Body() completeRideDto: LocationDto,
    @Param('id') rideId: string,
  ) {
    return this.ridesService.completeRide(req.user.id, rideId, completeRideDto);
  }
}
