import * as http from 'http';
import { readFileSync } from 'fs';
import routes from './routes.js';

const PORT = process.env.PORT || 3000;

const requestHtmlListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200);
    res.end(readFileSync('./index.html'));
}

const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    switch(req.url) {
        case '/':
            requestHtmlListener(req, res);
            break;
        case '/books':
            res.writeHead(200);
            res.end(routes.books);
            break;
        case '/authors':
            res.writeHead(200);
            res.end(routes.authors);
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
            break;
    }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
