// import { Request, Response } from 'express';
const { mongoError, successResponse, insufficientParameters, failureResponse } = require('../common/service');
// import { IUser } from '../modules/users/model';
// let apiResponse = new ApiResponse();
let GoldLoanService =  require('../services/goldLoanService');
let goldLoanService = new GoldLoanService();

class GoldLoanController {

    create_user(req, res) {
      // res.send("EMPTY REQUEST...");
        // this check whether all the filds were send through the erquest or not
        if (req.body.name &&
            req.body.email &&
            req.body.phone_number &&
            req.body.gender) {
            const user_params = {
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New user created'
                }]
            };
            console.log('user_params',  user_params);
            goldLoanService.createUser(user_params, (err, user_data) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create user successfull', user_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            goldLoanService.filterUser(user_filter, (err, user_data) => {
                console.log('user_data', user_data);
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    get_user_list(req, res) {

        goldLoanService.userList((err, user_data_list) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('get all user list successfull', user_data_list, res);
            }
        });
    }

    update_user(req, res) {
        if (req.params.id &&
            req.body.name ||
            req.body.email ||
            req.body.phone_number ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            goldLoanService.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    user_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'User data updated'
                    });
                    const user_params = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_notes: user_data.modification_notes
                    };
                    goldLoanService.updateUser(user_params, (err) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    delete_user(req, res) {
        if (req.params.id) {
            goldLoanService.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}

module.exports = GoldLoanController;
