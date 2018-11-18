const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

require('./connection/db');

// var server = Restify.createServer({
//     name: 'Security',
//     versions: ['1.0.0']
// });

const server = express();

// server.use(Restify.plugins.queryParser());
// server.use(Restify.plugins.jsonBodyParser());
server.use(bodyParser.json());
server.use(cors());

server.options('*', cors());

require('./routes/license')(server);
require('./routes/user')(server);

server.listen(process.env.PORT || config.ENV_CONFIG.server.port, config.ENV_CONFIG.server.ip, (err) => {
  console.log("Server IP : " + config.ENV_CONFIG.server.ip + "\nServer PORT: " + (process.env.PORT || config.ENV_CONFIG.server.port));
});
