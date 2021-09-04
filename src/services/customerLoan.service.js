let customerLoan = require('../models/customerLoan.model');
const mongoose = require('mongoose');

class CustomerLoanService {

    createReqLoan(loanParams, callback) {
        const _session = new customerLoan(loanParams);
        _session.save(callback);
    }

    filterCustomer(loanParams, callback) {
        customerLoan.findOne(loanParams, callback);
    }

    customerACSummary(loanParams, callback) {
        let aggregateQuery = [
            {
                '$match' : { _id : mongoose.Types.ObjectId(loanParams._id) }
            },
            {
                '$project' : {
                    'paymentDetails': 1
                }
            }
        ];
        customerLoan.aggregate(aggregateQuery, callback);
    }
}

module.exports = CustomerLoanService; 