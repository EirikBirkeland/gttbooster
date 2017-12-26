#FROM node:8.9.3
FROM mhart/alpine-node:8

WORKDIR /central

COPY . .

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]
