const securityDevelopment = {
    db: {
        connectionString: "mongodb+srv://Vishal1419:1419251v@security-dev.6rmco.mongodb.net/security_dev?retryWrites=true&w=majority",
    },
    server:{
        ip:"127.0.0.1",
        port:8888
    },
    maximumGeneratedKeys: 10
};
const securityProduction = {
    db: {
        connectionString: "mongodb+srv://Vishal1419:1419251v@security-prod.vh9br.mongodb.net/security_prod?retryWrites=true&w=majority",
    },
    server:{
        ip:"0.0.0.0",
        port:8888
    },
    maximumGeneratedKeys: 10
};

module.exports.ENV_CONFIG = securityProduction;
