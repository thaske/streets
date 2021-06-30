FROM node:14 AS base

# Create app directory
WORKDIR /app

# Install pm2
RUN npm install pm2 -g

# Install app dependencies
FROM base AS builder
COPY package*.json babel.config.json ./
RUN npm install 
COPY ./src ./src
RUN npm run build
RUN npm prune --production

FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "pm2-runtime", "dist/index.js" ]