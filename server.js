const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ?? 3000
const app = next({ dev: true});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/dummy', (req, res) => {
        try {
            return res.send('This is an custom server')
        } catch (err) {
            console.log(err)
        }
    })
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`- Local:      http://localhost:${port}`)
    })
})