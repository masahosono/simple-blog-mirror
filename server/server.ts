import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()
const server = express()

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handler(req, res)
    })

    server.listen(3000, err => {
        if (err) console.error(err.stack)
        console.debug('> Ready on http://localhost:3000')
    })
}).catch(err => {
    console.error(err.stack)
    process.exit(1)
})