import * as http from "http";
import client from "./config/db.config.js";
import routes from "./routes.js";
import { authController, userController } from "./controller/index.js";

const PORT = process.env.PORT || 5000;

await client.connect();

async function handleRequest(req, res, body) {
  switch (req.url) {
    case "/":
      res.end(JSON.stringify({ message: "Hello World" }));
      break;
    case routes.auth.login:
      await authController.login(req, res, body);
      break;
    case routes.user.profile:
      await userController.getProfile(req, res, body);
      break;
    default:
      res.end(JSON.stringify({ error: "Resource not found" }));
      break;
  }
}

const requestListener = async (req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      body = Buffer.concat(body).toString();
      await handleRequest(req, res, body);
    });
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.writeHead(200);
  await requestListener(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
