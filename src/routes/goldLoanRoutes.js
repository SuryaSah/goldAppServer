const express = require("express");
const router = express.Router();

const GoldLoanController = require('../controllers/goldLoanController');
let goldLoanControllerObj = new GoldLoanController();

const CoustomerLoanController = require('../controllers/customerLoan.controller');
let CoustomerLoanCntlrObj = new CoustomerLoanController();

router.route('/').get(function(req,res){
    res.send("EMPTY REQUEST...");
});

//To get all post
router.route('/get_user_list').get(goldLoanControllerObj.get_user_list);
router.route('/get_user/:id').get(goldLoanControllerObj.get_user);
router.route('/create_user').post(goldLoanControllerObj.create_user);
router.route('/update_user/:id').put(goldLoanControllerObj.update_user);
router.route('/delete_user/:id').delete(goldLoanControllerObj.delete_user);
router.route('/create_req_loan/:id').post(CoustomerLoanCntlrObj.createCustomerReqLoan);
router.route('/get_loan_info/:id').get(CoustomerLoanCntlrObj.getCustomerLoanInfo);
router.route('/customer_ac_history/:id').get(CoustomerLoanCntlrObj.getCustomerACSummary);

module.exports = router;
