import client from "../config/db.config.js";
import jwt from "jsonwebtoken";

const login = async (req, res, body) => {
  const { email, password } = JSON.parse(body);
  const user = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Email or password incorrect" }));
  }
  if (password === user.rows[0].password) {
    // Generate token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.TOKEN_SECRET, {
      expiresIn: "10d",
    });
    const response = { token: token };
    res.writeHead(200);
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Email or password incorrect" }));
  }
};

export const authController = {
  login,
};
