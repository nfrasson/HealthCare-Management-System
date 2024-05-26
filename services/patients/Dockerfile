FROM node:22 AS builder
WORKDIR /app
COPY .swcrc ./
COPY src/ ./src/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --omit=dev --ignore-scripts
RUN npm run generate
RUN npm run build

FROM node:22
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/infrastructure/api/main"]