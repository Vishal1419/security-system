const validator = require('isvalid');
const AppResponse = require('../security_response');

const validateRequest = (schema, errorCallback) => (request, response, next) => {
  validator((request.body || request.params),
    schema,
    (err) => {
      if (!err) {
        next();
      } else {
        if (errorCallback !== undefined) {
          errorCallback(request, response);
        }

        const customResponse = new AppResponse(response);
        customResponse.setStatusCode(err.message.errorCode)
          .setResponseBody({ error: err.message.message })
          .send();
      }
    }
  );
};

module.exports = validateRequest;