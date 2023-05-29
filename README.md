# Ride-hailing API

This project is a JSON RESTful API, for a small ride-hailing service with Integrated payment gateway.

## Technologies used

- **Runtime:** [NodeJS](https://nodejs.org/en)
- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Security System:** [JWT](https://jwt.io/)
- **Testing:** [Jest](https://jestjs.io/)
- **Deployment:** [Docker](https://www.docker.com/)

## Documentation

This API integrates the Open-API - Swagger standard, you can see this documentation by accessing by `/api/v1`.

## Setup

Installations required for this project:

- NodeJS 18 or higher
- This project use [Yarn](https://yarnpkg.com/) as dependency manager
- Docker

### Install dependencies

```bash
yarn install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

You can be guided by the `.env.example` file located in the root of the project.

### Run database

This project have setup

```bash
docker compose up -d
```

### Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

This API runs on port `3000` by default and has the following prefix with versioning `/api/v1`

### Seed

To seed data for this project please make this request `POST /api/v1/seed` reply `201`

The data can be found at `src/seed/data`

### Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

The result of the coverage can be seen in the `/coverage` folder in the root of the project.

## Deployment

To deploy this project run:

```bash
docker compose -f docker-compose.prod.yml up -d
```

For production you have port `80` assigned, if you want to change this configuration you can see the `docker-compose.prod.yml`

## Security

This project uses JWT to validate resource authorization. It will first require you to authenticate yourself.

The access token must be sent in the `Authorization` header with the prefix `Bearer`, example:

`Authorization: Bearer {token}`.

## API Reference

This API integrates the Open-API - Swagger standard, you can see this documentation by accessing by `/api/v1`.

#### Login

```http
  GET /api/v1/auth/login
```

| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Authors

- [@esteguri](https://www.github.com/esteguri)
