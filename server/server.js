const http = require('http');
const { app } = require('./app');
const controller = require('./socketInit');
const { backup } = require('./utils/backupUtil');

require('./dbMongo/mongoose');

const server = http.createServer(app);
const port = process.env.PORT ?? 5000;

controller.createConnection(server);
server.listen(port);
backup('./logFile.json');
