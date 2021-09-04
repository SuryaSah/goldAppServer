const { mongoError, successResponse, insufficientParameters, failureResponse } = require('../common/service');

let CustomerLoanService =  require('../services/customerLoan.service');
let customerLoanService = new CustomerLoanService();

class CoustomerLoanController {

    createCustomerReqLoan(req, res) {
        if (req.params.id &&
            req.body.amount &&
            req.body.installmentType &&
            req.body.loanType &&
            req.body.interestRate
            ) {
            const loanParams = {
                customerId: req.params.id,
                amount: req.body.amount,
                loanType: req.body.loanType,
                interestRate: req.body.interestRate,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New customer loan created'
                }]
            };
            customerLoanService.createReqLoan(loanParams, (err, user_data) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create customer loan request successfull', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    getCustomerLoanInfo(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            customerLoanService.filterCustomer(user_filter, (err, user_data) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get customer loan information successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    getCustomerACSummary(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            customerLoanService.customerACSummary(user_filter, (err, user_data) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get customer loan information successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}

module.exports = CoustomerLoanController;