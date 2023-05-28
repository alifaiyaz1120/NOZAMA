FROM node:alpine

WORKDIR /app

COPY ./package*.json /app/frontend
COPY . .

RUN npm install


CMD ["npm", "run", "start"]