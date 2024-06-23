FROM node:lts AS builder
WORKDIR /home/node/app
COPY .swcrc ./
COPY src/ ./src/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --omit=dev --ignore-scripts
RUN npm run generate
RUN npm run build

FROM node:lts
WORKDIR /home/node/app
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:dev"]