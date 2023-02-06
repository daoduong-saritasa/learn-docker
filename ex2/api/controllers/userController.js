import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const getProfile = async (req, res) => {
  const { headers } = req;
  const { authorization } = headers;
  const token = authorization.split(" ")[1];
  if (token === "undefined") {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  if (decoded) {
    const userId = decoded.id;
    const user = await User.findFirst("id", userId);
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Unauthorized" }));
  }
};

export const userController = {
  getProfile,
};
