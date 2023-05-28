FROM node:alpine

WORKDIR /app/server

COPY ./package.json /app/server
COPY ./package-lock.json /app/server


COPY . .

RUN npm install

CMD ["npm", "run", "start"]