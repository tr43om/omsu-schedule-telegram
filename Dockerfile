# Use the official Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application for production
RUN yarn build

# Remove development dependencies
RUN yarn install --production --frozen-lockfile

# Expose the port that the Next.js application will run on
EXPOSE 3001

# Start the Next.js application in production mode
CMD ["yarn", "start"]
