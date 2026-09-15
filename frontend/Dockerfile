FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
# Install dependencies and immediately purge npm download cache to minimize image size
RUN npm ci && npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
