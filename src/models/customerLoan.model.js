
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerLoan = new Schema({
  customerId : {
    type: Schema.Types.ObjectId, ref: 'users'    //change to customer
  },
  amount: {
      type: Number
  },
  loanReqDate: {
    type: Date, default:new Date()
  },
  loanStartDate: {
    type: Date, default:null
  },
  loanEndDate: {
    type: Date, default:null
  },
  installmentType: {
    type: String, enum:['NOEMI','EMI'], default:'NOEMI'
  },
  loanType: {
    type: String
  },
  interestRate: {
    type: Number
  },
  modification_notes: [],
  paymentDetails: []
},
{
  timestamps: true
});

module.exports = mongoose.model('customerLoan', customerLoan);
