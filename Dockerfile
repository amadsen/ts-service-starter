FROM node:12.18.1-alpine

# If you need an NPM_TOKEN to access a private npm registry
# ARG NPM_TOKEN

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy both package.json AND package-lock.json
COPY package*.json ./

# If you need a custom .npmrc file for loading modules from a private npm registry, copy it here
# COPY .npmrc ./

RUN npm ci --only=production

# Bundle app source
COPY . .

# Build our applcation from typescript.
RUN tsc -p

# Link the 'bin' keys so we can use them as commands
# Remember that the bin keys need to point at the compiled javascript, not the src typescript
RUN npm link

CMD ["node", "dist/src/index.js"]
