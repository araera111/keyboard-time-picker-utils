FROM node:18-slim as builder
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY ./src ./src
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY build.mjs ./
RUN yarn dbuild

FROM node:18-slim
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist
CMD ["node", "./dist/main.js"]
