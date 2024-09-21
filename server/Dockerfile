# Step 1: Use an official Node.js runtime as a base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]
