FROM node:16-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY . .
CMD ["npm", "start"]
EXPOSE 3000