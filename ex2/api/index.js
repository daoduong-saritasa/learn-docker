import express from 'express';
import connectDatabase from './config/db.config.js';
import Post from './model/post.js';

const app = express();
app.use(express.json());

// Connect database
// connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello World from ex2 api');
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});