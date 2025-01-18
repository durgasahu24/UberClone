const http = require('http');
const app = require('./app');
const port = process.env.PORT;
const { initializeSocket } = require('./socket');


const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log("port is running on ", port);
})
