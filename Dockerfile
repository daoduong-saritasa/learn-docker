FROM ubuntu:20.04
RUN apt-get update && apt-get install nodejs -y \
    && apt-get install npm -y \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY . .
CMD ["npm", "start"]