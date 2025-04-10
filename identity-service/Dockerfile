FROM node:14.18.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/identity_portal

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

CMD ["node", "dist/main"]