
// import { IUser } from './model';
const mongoose = require('mongoose');
let users = require('../models/goldLoanUser.model');

class GoldLoanService {

  createUser(user_params, callback) {
      const _session = new users(user_params);
      _session.save(callback);
  }

  filterUser(query, callback) {
      
      let aggregateQuery = [
        {
            '$match' : {_id : mongoose.Types.ObjectId(query._id)}
        },
        {
            '$lookup': {
                'from': "customerloans",
                'localField': "_id",
                'foreignField': "customerId",
                'as': "customerLoanInfo"
            }
        },
        {
            '$project' : {
                "name" : 1,
                "email" : 1,
                "phone_number" : 1,
                "gender" : 1,
                'customerLoanInfo' : {
                    '_id' : 1,
                    'amount' : 1,
                    "loanType" : 1,
                    "interestRate" : 1,
                    "status" : 1,
                    "installmentType" : 1,
                    "productType" : 1
                    }
            }
        }
        ];
      users.aggregate(aggregateQuery, callback);
  }

  userList(callback) {
      users.find({},callback);
  }

  updateUser(user_params, callback) {
      const query = { _id: user_params._id };
      users.findOneAndUpdate(query, user_params, callback);
  }

  deleteUser(_id, callback) {
      const query = { _id: _id };
      users.deleteOne(query, callback);
  }

}

module.exports = GoldLoanService;
