import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const login = async (req, res, body) => {
  const { email, password } = JSON.parse(body);
  const user = await User.findFirst("email", email);
  if (!user) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "Email or password incorrect" }));
    return;
  }
  if (password === user.password) {
    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
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
