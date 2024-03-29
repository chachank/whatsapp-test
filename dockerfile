FROM zenika/alpine-chrome:with-puppeteer

# Set the working directory
WORKDIR /usr/src/app

# Switch to use chrome
USER chrome

# Copy your application files into the container
COPY --chown=chrome:chrome . .

# Install your Node.js application dependencies
RUN npm install

# Start your Node.js application
CMD ["node", "test.js"]