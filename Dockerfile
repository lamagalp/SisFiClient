# Usar imagenes -alpine que son más livianas
FROM node:19-alpine3.15 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 80

RUN npm run build:local


FROM nginx:alpine

COPY --from=build-step /app/dist/client /usr/share/nginx/html
