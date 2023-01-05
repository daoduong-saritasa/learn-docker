import express from 'express';
import client from './config/db.config.js'
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const app = express();
app.use(express.json()).use(cors());

// Connect database
await client.connect();

app.get('/', (req, res) => {
    const users = usersRes.rows;
    res.json(users);
})

app.post("/auth/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await client.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
        return res.status(401).send("Username or password incorrect");
    }
    if (password === user.rows[0].password) {
        // Generate token
        const token = jwt.sign({ id: user.rows[0].id }, process.env.TOKEN_SECRET, { expiresIn: "10d" });
        res.send(token);
    }
    else {
        res.status(401).send("Username or password incorrect");
    }
    
})

app.get('/user/profile', async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
        const userId = decoded.id;
        const user = await client.query("SELECT * FROM users WHERE id = $1", [userId]);
        res.send(user.rows[0]);
    }
    else {
        res.status(401).send("Unauthorized");
    }
})

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
