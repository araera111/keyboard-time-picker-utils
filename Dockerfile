FROM node:18.13-slim
ENV NODE_ENV production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile
RUN yarn build
COPY . .
CMD ["node", "./dist/main.js"]
