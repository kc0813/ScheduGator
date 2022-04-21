# pull official base image
FROM node:alpine

# Only copy the package.json file to work directory
WORKDIR /usr/src/app
COPY ./frontend/package.json .

# Install all Packages
RUN npm install
RUN npm install -g typescript
# Copy all other source code to work directory
ADD ./frontend/tsconfig.json /usr/src/app/tsconfig.json
ADD ./frontend/src /usr/src/app/src
ADD ./frontend/public /usr/src/app/public
CMD [ "npm", "start" ]