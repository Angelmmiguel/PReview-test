// content of index.js
const http = require('http'),
  port = process.env.PORT || 3000;

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello World!');
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Server is listening on ${port}`)
})
