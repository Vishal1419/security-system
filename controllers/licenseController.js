const rand = require('random-key');

const SecurityResponse = require('../security_response');
const licenseModel = require('../models/license');
const config = require('../config');

module.exports = {

  generateLicenses: (request, response) => {
    const security_response = new SecurityResponse(response);

    licenseModel.getAll((err, allLicenses) => {
      if(err) {
        return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                                .setResponseBody({'error': err})
                                .send();
      }

      const allKeys = allLicenses.map(license => license.key);

      licenseModel.getUnusedLicenseCount((err, unusedLicensesCount) => {
        if(err) {
          return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                                  .setResponseBody({'error': err})
                                  .send();
        }

        const newLicenses = [];
        while((unusedLicensesCount + newLicenses.length) < config.ENV_CONFIG.maximumGeneratedKeys) {
          const license = {
            key: rand.generateBase30(25),
            hdd: null,
            is_used: false,
            updated_times: 0
          }

          if (!allKeys.includes(license.key)) {
            newLicenses.push(license);
          }
        }
  
        if(newLicenses.length > 0) {
          licenseModel.bulkCreateLic(newLicenses, function(err, result) {
            if(err) {
              return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                .setResponseBody({'error': err})
                .send();
            }

            security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
              .setResponseBody(result.result)
              .send();
          });      
        } else {
            security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
                            .setResponseBody({'n': 0})
                            .send();
        }
      });  
    });
  },

  getLicenses: function (request, response) {
    const security_response = new SecurityResponse(response);

    const query = request.query.q ? request.query.q[0].toUpperCase() + request.query.q.slice(1) : 'All';
    let getLicensesFromDb = () => {};
    if (licenseModel[`get${query}`]) getLicensesFromDb = licenseModel[`get${query}`];
    else getLicensesFromDb = licenseModel['getAll']
    getLicensesFromDb((err, licenses) => {
      if(err) {
        return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                                .setResponseBody({'error': err})
                                .send();
      }
              
      security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
                        .setResponseBody({'licenses': licenses})
                        .send();
    });
  },
};