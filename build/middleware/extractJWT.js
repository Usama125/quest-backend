"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var makeResponse_1 = __importDefault(require("../functions/makeResponse"));
var NAMESPACE = "Auth";
var extractJWT = function (req, res, next) {
    var _a;
    logging_1.default.info(NAMESPACE, 'Validating Token');
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, function (error, decoded) {
            if (error) {
                return (0, makeResponse_1.default)(res, 404, error.message, error, true);
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};
exports.default = extractJWT;
