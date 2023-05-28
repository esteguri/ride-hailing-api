FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /api
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 AS builder
WORKDIR /api
COPY --from=deps /api/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/api
COPY package.json yarn.lock .env ./
RUN yarn install --prod --frozen-lockfile
COPY --from=builder /api/dist ./dist

CMD [ "node","dist/main" ]