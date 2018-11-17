const Restify = require('restify');

const config = require('./config');

require('./connection/db');

var server = Restify.createServer({
    name: 'Security',
    versions: ['1.0.0']
});

server.use(Restify.plugins.queryParser());
server.use(Restify.plugins.jsonBodyParser());

require('./routes/license')(server);
require('./routes/user')(server);

server.listen(config.ENV_CONFIG.server.port,config.ENV_CONFIG.server.ip,function(err){
  console.log("Server Url : "+server.url);
});
