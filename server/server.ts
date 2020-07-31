import express from 'express';
import next from 'next';
import multer from "multer";
import fs from "fs";
import moment from "moment";

import apiRoutes from './api'
import auth from "./auth";

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()
const server = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/image/article/' + moment().format('YYYYMMDD');
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, () => {
                cb(null, dir)
            });
        } else {
            cb(null, dir)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage }).single('file');

app.prepare().then(() => {
    server.use("/api", apiRoutes, (req, res) => {
        req.url = req.originalUrl;
        return handler(req, res);
    });

    server.get(/^\/admin/, auth, (req, res) => {
        return handler(req, res);
    });

    server.all('*', (req, res) => {
        return handler(req, res)
    })

    server.listen(3000, err => {
        console.debug('> Ready on http://localhost:3000')
    })
}).catch(err => {
    console.error(err.stack)
    process.exit(1)
})