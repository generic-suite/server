FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# Build application
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]

