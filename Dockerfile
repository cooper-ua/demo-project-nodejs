# what node image we use as base
FROM node:latest

# where application live in container
WORKDIR /usr/src/app

# copy package.json and package-lock.json files to working directory
COPY package*.json ./

# install dependecies
RUN npm install

# copy all files and dirs to working directory
COPY . .

# which port should be lisened
EXPOSE 3000

# command should be run to start
CMD ["npm", "start"]