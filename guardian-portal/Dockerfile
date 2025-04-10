# FROM node:14.17.6

# # WORKDIR /admin

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm i

# # COPY . ./

# RUN npm start
FROM node:14.17.6

# set working directory
WORKDIR /members_portal
EXPOSE 7000
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]