const port = 3001

const https = require('https')
const url = require('url')
const fs = require('fs')
const path = require('path')
// const port = process.argv[2] || 9000;

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
}

https.createServer(options, (req, res) => {
  console.log(`${req.method} ${req.url}`)

  // parse URL
  const parsedUrl = url.parse(req.url)
  // extract URL path
  // let pathname = `.${parsedUrl.pathname}`;
  let pathname = parsedUrl.pathname.substr(1)
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  let { ext } = path.parse(pathname)

  if (!ext) {
    pathname = 'public/index.html'
    ext = '.html'
  }
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
  }

  fs.exists(pathname, (exist) => {
    if (!exist) {
      // if the file is not found, return 404
      res.statusCode = 404
      res.end(`File ${pathname} not found!`)
      console.log('#404', `File ${pathname} not found!`)
      return
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += `/index${ext}`

    // read file from file system
    fs.readFile(pathname, (err, data) => {
      if (err) {
        console.log('#500', err)
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain')
        res.end(data)
      }
    })
  })
}).listen(parseInt(port), () => {
  console.log(`\n${new Date()} =================================`)
  console.log(`Server started at ${port}`)
})
