FROM node:16-alpine3.15 

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY . .

RUN npm install
RUN npm run tsc

CMD [ "npm", "start" ]