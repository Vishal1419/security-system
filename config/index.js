const securityDevelopment = {
    db: {
        "database": "security_dev",
        "host": "Vishal1419:1419251v@ds029901.mlab.com",
        "port": 29901,
    },
    server:{
        ip:"127.0.0.1",
        port:8888
    },
    maximumGeneratedKeys: 10
};
const securityProduction = {
    db: {
        "database": "security_prod",
        "host": "Vishal1419:1419251v@ds211504.mlab.com",
        "port":11504,
    },
    server:{
        ip:"https://security-system.herokuapp.com/",
        port:80
    },
    maximumGeneratedKeys: 10
};

module.exports.ENV_CONFIG = securityProduction;