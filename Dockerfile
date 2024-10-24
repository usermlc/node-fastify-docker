# Base image: use the official Node.js LTS image
FROM node:18

# Set the working directory in the container
WORKDIR /srv/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install any dependencies (none in this case)
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]
