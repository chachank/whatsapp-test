FROM zenika/alpine-chrome:with-puppeteer

# Set the working directory
WORKDIR /usr/src/app

# Switch to use chrome
USER chrome

# Copy your application files into the container
COPY --chown=chrome:chrome . .

# Install your Node.js application dependencies
RUN npm install

# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

# Start your Node.js application
CMD ["node", "test.js"]