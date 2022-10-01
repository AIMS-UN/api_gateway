FROM node:lts as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --development

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:lts-slim as runner

WORKDIR /app

COPY package*.json ./

RUN npm pkg delete scripts.prepare
RUN npm ci --production


COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]
