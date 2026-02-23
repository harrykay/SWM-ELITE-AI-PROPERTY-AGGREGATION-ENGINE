# Build stage
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Coolify injects build-time variables automatically
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./
COPY --from=build /app/vite.config.ts ./

# Install tsx to run the server
RUN npm install -g tsx

EXPOSE 3000

ENV NODE_ENV=production

CMD ["tsx", "server.ts"]
