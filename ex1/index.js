import express from 'express';
import connectDatabase from './config/db.config.js';
import Post from './model/post.js';

const app = express();
app.use(express.json());

// Connect database
// connectDatabase();

app.post('/posts', (req, res) => {
    const post = new Post(req.body)
    post.save()
        .then(() => {
            res.send('Post saved successfully');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/posts', async (req, res) => {
    const post = await Post.find();
    res.send(post);
});

app.get('/', (req, res) => {
    res.send('Hello World');
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});