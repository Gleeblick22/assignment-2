FROM node:18.16.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

EXPOSE 3000

CMD echo 1; npm install; echo 2; FAST_REFRESH=false; echo 3; npm run start