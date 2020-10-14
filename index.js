const { Server } = require('http');
Server((req, res) => {
    if (req.url === '/v8') return res.end(`${process.versions.v8}`);
    res.end('bogdanovsi');
})
.listen(process.env.PORT);