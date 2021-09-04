
const { response_status_codes } = require('./../config/config.js');

  module.exports.successResponse = function(message, DATA, res) {
      res.status(response_status_codes.success).json({
          STATUS: 'SUCCESS',
          MESSAGE: message,
          DATA
      });
  }

  module.exports.failureResponse = function(message, DATA, res) {
      res.status(response_status_codes.success).json({
          STATUS: 'FAILURE',
          MESSAGE: message,
          DATA
      });
  }

  module.exports.insufficientParameters = function(res) {
      res.status(response_status_codes.bad_request).json({
          STATUS: 'FAILURE',
          MESSAGE: 'Insufficient parameters',
          DATA: {}
      });
  }

  module.exports.mongoError = function(err, res) {
      res.status(response_status_codes.internal_server_error).json({
          STATUS: 'FAILURE',
          MESSAGE: 'MongoDB error',
          DATA: err
      });
  }
