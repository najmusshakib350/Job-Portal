FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/backend ./apps/backend

RUN npm install -g pnpm

RUN pnpm install --filter backend...

RUN pnpm --filter backend build

EXPOSE 5000

CMD ["pnpm", "--filter", "backend", "start"]