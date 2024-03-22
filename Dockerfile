FROM node:20-slim

ARG MAP_API_KEY
ARG MAP_ID
ARG API_URL=https://meetups-dev-6vuzexfx2q-lm.a.run.app/api/v1/

# Create a directory for our application in the container
RUN mkdir -p /usr/src/app

# Set this new directory as our working directory for subsequent instructions
WORKDIR /usr/src/app

# Copy all files in the current directory into the container
COPY . .

# Set the PYTHONPATH environment variable, which is occasionally necessary for certain node packages
# 'PWD' is an environment variable that stores the path of the current working directory
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

# Set the environment variable for the application's port
# (Be sure to replace '4200' with your application's specific port number if different)
ENV PORT 3000

ENV VITE_APP_BASE_URL_API $API_URL
ENV VITE_APP_GOOGLE_MAP_ID $MAP_ID
ENV VITE_APP_GOOGLE_MAP_API_KEY $MAP_API_KEY

# Install 'serve', a static file serving package globally in the container
RUN npm install -g serve

# Install all the node modules required by the React app
RUN npm install
# Build the React app
RUN npm run build

# Serve the 'build' directory on port 3000 using 'serve'
CMD ["serve", "-s", "-l", "3000", "dist"]