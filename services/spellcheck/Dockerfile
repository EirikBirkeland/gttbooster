FROM node:9.4.0-slim

WORKDIR /central

COPY . .

RUN apt-get update && apt-get install aspell aspell-* -y

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]
