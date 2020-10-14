const { Server } = require('http');
const fs = require('fs');
const urlParser = require('url');

const returnFile = (url, res) => {
    fs.readFile(`${__dirname}/${url}`, function (err, data) {
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
    const queryObject = urlParser.parse(url, true).query;
    return queryObject.x;
}

const setCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'x-test, Content-Type, Authorization, Content-Length, X-Requested-With');
}

const main = (body, req, res) => {
    setCORSHeaders(res);
    res.setHeader('X-Author', 'itmo287662');

    if (String(req.url).includes('mirror')) {
        return res.end(`${queryX(req.url)}`);
    }

    if (req.url.includes('/result4/')) {
        res.setHeader("Content-Type", 'application/json');

        console.log(req.headers);
        console.log(body);

        return res.end(JSON.stringify({
            message: 'itmo287662',
            ['x-result']: req.headers['x-test'],
            ['x-body']: body,
        }))
    }

    switch (req.url) {
        case '/fetch/': {
            returnFile('/fetch.html', res);
            break;
        }
        case '/promise/': {
            res.setHeader("Content-Type", 'text/plain; charset=UTF-8');
            returnFile('/promise.js', res);
            break;
        }
        case '/sample/': {
            res.setHeader("Content-Type", 'text/plain; charset=UTF-8');
            returnFile('/sample.js', res);
            break;
        }
        case '/v8': return res.end(`${process.versions.v8}`);
        case '/node': return res.end(`${process.version.replace('v', '')}`);
        case '/day': return res.end(String(new Date().getDate()));
        case '/package.json': {
            res.setHeader("Content-Type", 'text/plain; charset=UTF-8');
            returnFile(req.url, res);
            break;
        }
        default: return res.end('itmo287662');
    }
}

Server((req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        main(body, req, res);
    });
}).listen(process.env.PORT || 8080);