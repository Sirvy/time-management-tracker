FROM node:lts-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]