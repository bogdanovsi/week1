const { Server } = require('http');
const fs = require('fs');
const path = require('path');

const returnFile = (url) => {
    fs.readFile(`${__dirname}/${url}`, function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
    });
}

Server((req, res) => {
    switch(req.url) {
        case '/v8': return res.end(`${process.versions.v8}`);
        case '/node': return res.end(`${process.version}`);
        case '/day': return String(new Date().getDate());
        case '/mirror': return res.end(`${req.query.x}`);
        case '/package.json': {
            returnFile(req.url); 
            break;
        }
        default: return res.end('bogdanovsi');
    }
})
.listen(process.env.PORT);