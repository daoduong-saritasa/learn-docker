import express from 'express';
import client from './config/db.config.js'
import cors from 'cors';

const app = express();
app.use(express.json()).use(cors());

// Connect database
await client.connect();
const usersRes = await client.query('SELECT * FROM users');

app.get('/', (req, res) => {
    const users = usersRes.rows;
    res.json(users);
})

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
