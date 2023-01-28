FROM node:latest

WORKDIR /usr/src/frontend
ENV HOST="0.0.0.0"

COPY package*.json ./
RUN npm install

COPY . .
CMD npm start