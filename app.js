const Restify = require('restify');
const cors = require('cors');
const config = require('./config');

require('./connection/db');

var server = Restify.createServer({
    name: 'Security',
    versions: ['1.0.0']
});

server.use(Restify.plugins.queryParser());
server.use(Restify.plugins.jsonBodyParser());
server.use(cors());

app.options('*', cors());

require('./routes/license')(server);
require('./routes/user')(server);

server.listen(process.env.PORT || config.ENV_CONFIG.server.port, config.ENV_CONFIG.server.ip, (err) => {
  console.log("Server Url : "+server.url);
});
