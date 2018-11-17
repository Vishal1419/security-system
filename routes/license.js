const licenseController = require('../controllers/licenseController.js');

module.exports = function (server) {  
  server.get(
    "/licenses",
    licenseController.getLicenses
  );
    
  server.post(
    "/licenses",
    licenseController.generateLicenses
  );
};