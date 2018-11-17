const userController = require('../controllers/userController.js');
const requestValidator = require('../validation/request_validator');
const validationSchema = require('../validation/validation_schema');

module.exports = (server) => {
  server.get(
    "/users",
    userController.getUsers
  );
  server.post("/user",
    requestValidator(validationSchema.user_license),
    userController.saveUser
  );
};