# Reference backend for the FE intern test.
FROM node:20-alpine

# Hosting platforms inject PORT; default to 4000 for local `docker run`.
ENV NODE_ENV=production \
    PORT=4000

WORKDIR /app

# Install production deps first for better layer caching.
COPY package*.json ./
RUN npm ci --omit=dev

# App source.
COPY src ./src

EXPOSE 4000

CMD ["node", "src/index.js"]
