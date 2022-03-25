import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../functions/signJWT';
import makeResponse, { sendErrorResponse } from '../functions/makeResponse';
import validateLoginInput from '../validation/login';

import _ from 'lodash';

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user authenticated");
    return res.status(200).json({
        message: "Authorized"
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return makeResponse(res, 400, "Parameter missing", false, true);
    }

    await User.find({ email }).exec().then(user => {
        if (user.length > 0) {
            return makeResponse(res, 400, "User with this email already exists", false, true);
        }

        // If email is valid
        bcryptjs.hash(password, 10, async (hashError, hash) => {
            if (hashError) {
                return false;
            }

            const _user = new User({
                _id: new mongoose.Types.ObjectId(),
                name,
                email,
                password: hash
            });

            _user.save().then(user => {
                return makeResponse(res, 200, "Authentication Successful", { user: user }, false);
            }).catch(err => console.log(err));
        });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return makeResponse(res, 400, "Validation Failed", false, true);
    }

    let { email, password } = req.body;

    User.find({ email })
        .exec()
        .then(async users => {
            if (users.length !== 1) {
                return makeResponse(res, 400, "Unauthorized", false, true);
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (!result) {
                    return makeResponse(res, 400, "Unauthorized", false, true);
                } else if (result) {
                    signJWT(users[0], async (_error, token) => {
                        if (_error) {
                            logging.error(NAMESPACE, 'Unable to sign token: ', _error);
                            return makeResponse(res, 400, "Unauthorized", false, true);
                        } else if (token) {
                            return makeResponse(res, 200, "Authentication Successful", { user: users[0], token: token }, false);
                        }
                    })
                }
            })
        }).catch(error => {
            return makeResponse(res, 400, error.message, null, true);
        })
};

export default {
    validateToken,
    login,
    register
};
