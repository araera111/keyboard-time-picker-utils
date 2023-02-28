FROM node:18.14-slim as builder
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY ./src ./src
COPY tsconfig.json ./
RUN yarn build

FROM node:18.14-slim
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=builder /app/dist ./dist
CMD ["node", "./dist/main.js", "> /var/log/"]
