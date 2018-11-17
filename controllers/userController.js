const mongoose = require("mongoose");

const SecurityResponse = require('../security_response');
const licenseModel = require('../models/license');
const userModel = require('../models/user');
const constants = require('../validation/error_messages');

module.exports = {

  saveUser: (request, response) => {
    const security_response = new SecurityResponse(response);

    //Try to get license key provided by user from license table in database
    licenseModel.getByKey(request.body.key, (err, licenses) => {
      if(err) {
        return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
          .setResponseBody({"error": err})
          .send();
      }                
  
      if(licenses && licenses.length > 0) {    
        //If user specified license is found in the database then 
        //check if license key is used or not
        if(licenses[0].is_used) {
          //Check if license used hdd and user's current hdd are same
          if(licenses[0].hdd == request.body.hdd) {

            licenseModel.updateLic({
              "_id": licenses[0]._id, 
              "key": licenses[0].key,
              "hdd": licenses[0].hdd,
              "is_used": true,
              "updated_times": licenses[0].updated_times + 1,
            }, (err, updatedLicense) => {
              if(err) {
                return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                  .setResponseBody({"error": err})
                  .send();
              }                

              userModel.getByKey(request.body.key, (err, user) => {
                if(err) {
                  return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                    .setResponseBody({"error": err})
                    .send();
                }

                userModel.updateUser({
                  _id: user._id,
                  name: request.body.name,
                  mobile_no: request.body.mobile_no,
                  licenses: user.licenses
                }, (err, updatedUser) => {
                  if(err) {
                    return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                      .setResponseBody({"error": err})
                      .send();
                  }

                  return security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
                    .setResponseBody({"result": "License updated Successfully"})
                    .send();
                });
              });
            });
          } else {
            //same key is used in another hdd.
            return security_response.setStatusCode(SecurityResponse.LICENSE_KEY_ERROR)
                                    .setResponseBody({"error": constants.ERROR_MESSAGES.LICENSE_KEY_ALREADY_IN_USE})
                                    .send();
          }
        } else {
          //If license key is found but is never used, then 
          // check if user already exists by mobile no
          userModel.getByMobileNo(request.body.mobile_no, (err, users) => {
            if(err) {
              return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                .setResponseBody({"error": err})
                .send();
            }                

            const lic = {
              "_id": licenses[0]._id,
              "key": licenses[0].key,
              "hdd": request.body.hdd,
              "is_used": true,
              "updated_times": 0
            }

            licenseModel.updateLic(lic, (err, updatedLicense) => {
              if(err) {
                return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                  .setResponseBody({"error": err})
                  .send();
              }     
              if(users && users.length > 0) {
                //user exists. Means existing user purchased a new license           
                  const new_licenses = users[0].licenses;
                  new_licenses.push(mongoose.Types.ObjectId(lic._id));

                  userModel.updateUser({
                      "_id": users[0]._id, 
                      "name": users[0].name,
                      "mobile_no": users[0].mobile_no, 
                      "licenses": new_licenses, 
                  }, (err, updatedUser) => {
                    if(err) {
                      return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                                              .setResponseBody({"error": err})
                                              .send();
                    }                

                    return security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
                      .setResponseBody({"result": "New License assigned to Existing User."})
                      .send();
                  });        
              } else {
                //user does not exist.
                //Create a new user
                const user = {
                  name: request.body.name,
                  mobile_no: request.body.mobile_no,
                  licenses: []
                }

                user.licenses.push(mongoose.Types.ObjectId(lic._id));
                userModel.createUser(user, function(err, result) {
                  if(err) {
                    return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
                      .setResponseBody({"error": err})
                      .send();
                  }                

                  return security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
                    .setResponseBody({"result": "New user created"})
                    .send();
                });                                
              }
            });
          });
        }
      } else {
        //License key does not exist in database.
        return security_response.setStatusCode(SecurityResponse.LICENSE_KEY_ERROR)
          .setResponseBody({"error": constants.ERROR_MESSAGES.INVALID_LICENSE_KEY})
          .send();
      }
    });
  },

  getUsers: function(request, response) {
      const security_response = new SecurityResponse(response);

      userModel.getAll(function(err, users) {
          if(err) {
            return security_response.setStatusCode(SecurityResponse.DATABASE_ERROR)
              .setResponseBody({"error": err})
              .send();
          }
              
          security_response.setStatusCode(SecurityResponse.SUCCESS_CODE)
            .setResponseBody({"users": users})
            .send();
      });
  }
};