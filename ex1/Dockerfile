FROM ubuntu:20.04
RUN apt-get update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs
WORKDIR /app
COPY package.json .
RUN npm install -g yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]