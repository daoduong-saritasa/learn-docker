import express from 'express';
import connectDatabase from './config/db.config.js';
import Post from './model/post.js';

const app = express();
app.use(express.json());

// Connect database
connectDatabase();

app.post('/', (req, res) => {
    const post = new Post(req.body)
    post.save()
        .then(() => {
            res.send('Post saved successfully');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/', async (req, res) => {
    const post = await Post.find();
    res.send(post);
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});