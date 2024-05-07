# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install lsof
RUN apt-get update && \
    apt-get install -y lsof && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install pm2@latest -g

# Copy application files
COPY . .

# Add pre-start command to log listening ports
RUN echo "lsof -i :3100" > /usr/src/app/startup.sh
RUN chmod +x /usr/src/app/startup.sh

# Expose port
EXPOSE 3100

# Command to run the application
CMD ["/bin/bash", "-c", "/usr/src/app/startup.sh && pm2-runtime app.js"]
