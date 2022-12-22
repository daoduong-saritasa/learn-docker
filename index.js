import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './config/db.config.js';

const app = express();

const requestListener = (req, res) => {
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.html'));
}

// Connect database
connectDatabase();

app.get('/', requestListener);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});