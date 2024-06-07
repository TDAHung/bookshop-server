# Stage 1: Build the application
FROM node:16 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

# Install only production dependencies
RUN npm install --only=production

# Copy the .env file
COPY .env ./

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
