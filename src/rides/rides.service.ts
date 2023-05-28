import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { Ride } from './entities/ride.entity';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RideStatus } from 'src/common';
import { LocationUtil } from './utils/location.util';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    private readonly usersService: UsersService,
    private readonly driversService: DriversService,
  ) {}

  async startRide(userId: string, locationDto: LocationDto) {
    const user = await await this.usersService.findById(userId);
    if (!user)
      throw new UnauthorizedException('Resource only available for users');

    const driver = await this.getDriversAvailable();

    const ride = await this.ridesRepository.create({
      user,
      driver,
      start_latitude: locationDto.latitude,
      start_longitude: locationDto.longitude,
    });

    await this.ridesRepository.save(ride);
    return {
      message: 'Ride started',
      data: {
        id: ride.id,
        driver: {
          id: driver.id,
          name: driver.name,
          license_plate: driver.license_plate,
        },
      },
    };
  }

  async completeRide(userId: string, rideId: string, locationDto: LocationDto) {
    const ride = await this.findById(rideId);
    if (!ride) throw new BadRequestException('Ride not found');

    if (ride.status !== RideStatus.started)
      throw new BadRequestException('Ride not started');

    if (ride.driver.id === userId)
      throw new BadRequestException('You are not the driver of this ride');

    await this.ridesRepository.save({
      ...ride,
      status: RideStatus.completed,
      end_date: new Date(),
      end_latitude: locationDto.latitude,
      end_longitude: locationDto.longitude,
    });

    return {
      message: 'Ride completed',
      data: {
        distance: LocationUtil.getDistance({
          lat1: ride.start_latitude,
          lon1: ride.start_longitude,
          lat2: locationDto.latitude,
          lon2: locationDto.longitude,
        }),
        price: 'COP 20.000',
      },
    };
  }

  async findById(id: string) {
    try {
      return await this.ridesRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Ride not found');
    }
  }

  private async getDriversAvailable() {
    const ridesStarted = await this.ridesRepository.find({
      where: {
        status: RideStatus.started,
      },
    });

    const driversNoAvailable = ridesStarted.map((ride) => ride.driver);

    const drivers = await this.driversService.findAll();

    const driversAvailable = drivers.filter((driver) => {
      return (
        driversNoAvailable.findIndex(
          (driverNoAvailable) => driverNoAvailable.id === driver.id,
        ) === -1
      );
    });

    if (driversAvailable.length === 0)
      throw new BadRequestException(
        'No drivers available, everyone has an assigned ride',
      );

    return driversAvailable[0];
  }
}
