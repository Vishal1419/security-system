const AppResponse = require('../security_response');
const constants = require('./error_messages');

module.exports = {
  user_license: {
    type: Object,
    unknownKeys: 'allow',
    required: true,
    schema: {
      name: {
        type: String,
        trim: true,
        required: true,
        match: /^.{1,}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.NAME.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.NAME.REQUIRED,
          }
        }
      },
      mobile_no: {
        type: String,
        trim: true,
        required: true,
        match: /^[1-9][0-9]{9,12}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.MOBILE_NO.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.PATTERN,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.MOBILE_NO.REQUIRED,
          }
        }
      },
      key: {
        type: String,
        trim: true,
        required: true,
        match: /^.{1,}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.KEY.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.KEY.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.KEY.REQUIRED,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.KEY.REQUIRED,
          }
        }
      },
      hdd: {
        type: String,
        trim: true,
        required: true,
        match: /^.{1,}$/,
        errors: {
          type: {
            errorCode: AppResponse.INVALID_DATA_TYPE,
            message: constants.HDD.INVALID_DT,
          },
          required: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.HDD.REQUIRED,
          },
          match: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.HDD.REQUIRED,
          },
          allowNull: {
            errorCode: AppResponse.REQUIRED_FIELD,
            message: constants.HDD.REQUIRED,
          }
        }
      },
    },
    errors: {
      required: {
        errorCode: AppResponse.REQUIRED_FIELD,
        message: constants.DETAILS_REQUIRED
      }
    }
  },
}