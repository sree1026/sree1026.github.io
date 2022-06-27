// const http = require('http');
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     if(req.url =='/') {
//         res.writeHead(200, {"content-type": 'text/html'});
//         const page = fs.readFileSync('index.html');
//         res.write(page);
//         // fs.createReadStream('index.html').pipe(res);
//         // console.log(__dirname);
//     }
//     res.end();
// })

// server.listen(3000, () => {
//     console.log("Server is running");
// })

import pkg from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const express = pkg;

const app = express();

const __fileName = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__fileName);

console.log(__dirname);

app.use(express.static(__dirname+'/'));



app.listen(3000);

console.log("node/Express server is running");






