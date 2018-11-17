const validator = require('isvalid');
const SecurityResponse = require('./security_response');

const AppUtils = {};

AppUtils.validateRequest = (schema, errorCallback) => (request, response, next) => {
  validator(
    (request.body || request.params),
    schema,
    (err) => {
      if(!err) {
        next();
      }else {
        if(errorCallback !== undefined){
          errorCallback(request, response);
        }

        const customResponse = new SecurityResponse(response);
        customResponse
          .setStatusCode(err.message.errorCode)
          .setResponseBody({error: err.message.message})
          .send();
      }
    }
  );
};

AppUtils.validateParams = (params, schema, request, response, next, errorCallback) => {
  validator(
    params,
    schema,
    function (error) {
      if(!error){
        next();
      }else{
        if(errorCallback != undefined){
          errorCallback(request, response);
        }

        const customResponse = new SecurityResponse(response);
        customResponse
          .setStatusCode(error.message.errorCode)
          .setResponseBody({error: error.message.message})
          .send();
      }
    });
};

module.exports = AppUtils;
