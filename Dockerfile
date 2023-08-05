FROM node:18-alpine

# Install Java OpenJDK 11 (For openapi-generator-cli)
RUN apk add --no-cache openjdk11

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install openapi-generator-cli globally
RUN npm install @openapitools/openapi-generator-cli -g

# Copy the rest of your application code into the Docker image
COPY . .

# Generate the API client
RUN openapi-generator-cli generate -i ./src/api/openapi/spec.yaml -g typescript -o ./src/api/build

EXPOSE 3002

CMD ["npm", "start"]
