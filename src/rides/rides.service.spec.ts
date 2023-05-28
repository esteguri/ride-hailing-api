import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service';
import { MockType, RepositoryMock } from 'src/common/types/repository.mock';
import { Repository } from 'typeorm';
import { Ride } from './entities/ride.entity';
import { ParametersKey, RideStatus } from 'src/common';
import { DriversSeed } from 'src/seed/data/drivers.seed';
import { UsersSeed } from 'src/seed/data/users.seed';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { ParametersService } from 'src/parameters/parameters.service';
import { PaymentsService } from 'src/payments/payments.service';
import { LocationDto } from './dto/location.dto';

describe('RidesService', () => {
  let service: RidesService;
  let repositoryMock: MockType<Repository<Ride>>;

  const userServiceMock = {
    findById: jest.fn(),
  };

  const driversServiceMock = {
    findAll: jest.fn(),
  };

  const parametersServiceMock = {
    get: (key) => {
      switch (key) {
        case ParametersKey.PRICE_MINUTE:
          return Promise.resolve(200);

        case ParametersKey.PRICE_KM:
          return Promise.resolve(1000);

        case ParametersKey.PRICE_BASE:
          return Promise.resolve(3500);
      }
    },
  };

  const paymentsServiceMock = {
    createPayment: jest.fn(),
  };

  const user = UsersSeed[0];
  const driver = DriversSeed[0];
  const ride: Ride = {
    id: '1',
    driver,
    status: RideStatus.started,
    user,
    start_date: new Date(),
    end_date: new Date(),
    start_latitude: 0,
    start_longitude: 0,
    end_latitude: 0,
    end_longitude: 0,
    price: 0,
  };

  const locationDto: LocationDto = {
    latitude: 0,
    longitude: 0,
  };

  beforeEach(async () => {
    const { provider, token } = RepositoryMock(Ride);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        provider,
        RidesService,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: DriversService,
          useValue: driversServiceMock,
        },
        {
          provide: ParametersService,
          useValue: parametersServiceMock,
        },
        {
          provide: PaymentsService,
          useValue: paymentsServiceMock,
        },
      ],
    }).compile();

    service = module.get<RidesService>(RidesService);
    repositoryMock = module.get(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a ride by id', async () => {
    repositoryMock.findOne.mockReturnValue(Promise.resolve(ride));
    const result = await service.findById('1');
    expect(result).toEqual(ride);
  });

  it('should find all rides', async () => {
    repositoryMock.find.mockReturnValue(Promise.resolve([ride]));
    const result = await service.findAll();
    expect(result).toEqual([ride]);
  });

  describe('StartRide', () => {
    it("shouldn't start a ride if is not a user", () => {
      userServiceMock.findById.mockReturnValue(Promise.resolve());
      expect(service.startRide('1', locationDto)).rejects.toThrow(
        'Resource only available for users',
      );
    });

    it("shouldn't start a ride if there is no driver available", async () => {
      userServiceMock.findById.mockReturnValue(Promise.resolve(user));
      repositoryMock.find.mockReturnValue(Promise.resolve([ride]));
      driversServiceMock.findAll.mockReturnValue(
        Promise.resolve([ride.driver]),
      );

      expect(service.startRide('1', locationDto)).rejects.toThrow(
        'No drivers available, everyone has an assigned ride',
      );
    });

    it('should start a ride correctly', async () => {
      userServiceMock.findById.mockReturnValue(Promise.resolve(user));
      repositoryMock.find.mockReturnValue(Promise.resolve([]));
      driversServiceMock.findAll.mockReturnValue(Promise.resolve([driver]));
      repositoryMock.create.mockReturnValue(ride);
      repositoryMock.save.mockReturnValue(Promise.resolve());

      const result = await service.startRide('1', locationDto);
      expect(result.message).toBe('Ride started');
      expect(result.data.id).toBe(ride.id);
      expect(result.data.driver.id).toEqual(ride.driver.id);
    });
  });

  describe('CompleteRide', () => {
    it("shouldn't complete a ride if not found", () => {
      repositoryMock.findOne.mockReturnValue(Promise.resolve());
      expect(service.completeRide('1', 'rideId', locationDto)).rejects.toThrow(
        'Ride not found',
      );
    });

    it("shouldn't complete a ride if it is started", () => {
      repositoryMock.findOne.mockReturnValue(
        Promise.resolve({
          ...ride,
          status: RideStatus.completed,
        }),
      );
      expect(service.completeRide('1', 'rideId', locationDto)).rejects.toThrow(
        'Ride not started',
      );
    });

    it("shouldn't complete a ride if is not a driver", () => {
      repositoryMock.findOne.mockReturnValue(
        Promise.resolve({
          ...ride,
          driver: {
            id: 'no-valid-driver',
          },
        }),
      );
      expect(service.completeRide('1', 'rideId', locationDto)).rejects.toThrow(
        'You are not the driver of this ride',
      );
    });

    it('should complete a ride correctly', async () => {
      const paymentResponse = {
        data: {
          reference: '123456789',
        },
      };

      repositoryMock.findOne.mockReturnValue(Promise.resolve(ride));
      repositoryMock.save.mockReturnValue(Promise.resolve());
      paymentsServiceMock.createPayment.mockReturnValue(
        Promise.resolve(paymentResponse),
      );

      const result = await service.completeRide(
        driver.id,
        'rideId',
        locationDto,
      );
      expect(result.message).toBe('Ride completed');
      expect(result.data.reference).toBe(paymentResponse.data.reference);
      expect(result.data.price).toBe(3500);
    });
  });
});
