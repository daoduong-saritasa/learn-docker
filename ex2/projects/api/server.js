import express from 'express';
import client from './config/db.config.js'

const app = express();
app.use(express.json());

// Connect database
// await client.connect();
// const usersRes = await client.query('SELECT * FROM users');

app.get('/', (req, res) => {
    // const users = usersRes.rows;
    // res.send(users);
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
