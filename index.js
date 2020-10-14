const { Server } = require('http');
const fs = require('fs');
const urlParser = require('url');

const returnFile = (url, res) => {
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

const queryX = (url) => {
    const queryObject = urlParser.parse(url,true).query;
    return queryObject.x;
}

Server((req, res) => {

    if (String(req.url).includes('mirror')) {
        return res.end(`${queryX(req.url)}`);
    }

    switch(req.url) {
        case '/v8': return res.end(`${process.versions.v8}`);
        case '/node': return res.end(`${process.version}`);
        case '/day': return res.end(String(new Date().getDate()));
        case '/package.json': {
            returnFile(req.url, res); 
            break;
        }
        default: return res.end('bogdanovsi');
    }
})
.listen(process.env.PORT || 8080);