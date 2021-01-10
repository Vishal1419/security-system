const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.ENV_CONFIG.db.connectionString);
