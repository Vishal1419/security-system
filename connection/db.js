const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(`mongodb://${config.ENV_CONFIG.db.host}:${config.ENV_CONFIG.db.port}/${config.ENV_CONFIG.db.database}`);
