import * as http from "http";
import client from './config/db.config.js'
import routes from "./routes.js";
import { authController, userController } from "./controller/index.js";

const PORT = process.env.PORT || 5000;

await client.connect();

async function handleRequest (req, res, body) {
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Hello World" }));
      break;
    case routes.auth.login:
      await authController.login(req, res, body);
      break;
    case routes.user.profile:
      await userController.getProfile(req, res, body);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
      break;
  }
}

const requestListener = async(req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async() => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    await handleRequest(req, res, body);
  });

};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
