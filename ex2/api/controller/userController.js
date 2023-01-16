import client from "../config/db.config.js";
import jwt from "jsonwebtoken";

const getProfile = async (req, res) => {
  const { headers } = req;
  const { authorization } = headers;
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  if (decoded) {
    const userId = decoded.id;
    const user = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    res.writeHead(200);
    res.end(JSON.stringify(user.rows[0]));
  } else {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Unauthorized" }));
  }
};

export const userController = {
  getProfile,
};
