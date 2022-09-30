FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:latest as runner

WORKDIR /app

COPY package*.json ./

RUN npm pkg delete scripts.prepare
RUN npm install --omit=dev


COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]
