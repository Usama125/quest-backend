"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("../models/user"));
var signJWT_1 = __importDefault(require("../functions/signJWT"));
var makeResponse_1 = __importDefault(require("../functions/makeResponse"));
var login_1 = __importDefault(require("../validation/login"));
var NAMESPACE = "User";
var validateToken = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Token validated, user authenticated");
    return res.status(200).json({
        message: "Authorized"
    });
};
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                if (!name || !email || !password) {
                    return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Parameter missing", false, true)];
                }
                return [4 /*yield*/, user_1.default.find({ email: email }).exec().then(function (user) {
                        if (user.length > 0) {
                            return (0, makeResponse_1.default)(res, 400, "User with this email already exists", false, true);
                        }
                        // If email is valid
                        bcryptjs_1.default.hash(password, 10, function (hashError, hash) { return __awaiter(void 0, void 0, void 0, function () {
                            var _user;
                            return __generator(this, function (_a) {
                                if (hashError) {
                                    return [2 /*return*/, false];
                                }
                                _user = new user_1.default({
                                    _id: new mongoose_1.default.Types.ObjectId(),
                                    name: name,
                                    email: email,
                                    password: hash
                                });
                                _user.save().then(function (user) {
                                    return (0, makeResponse_1.default)(res, 200, "Authentication Successful", { user: user }, false);
                                }).catch(function (err) { return console.log(err); });
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) {
    // Form validation
    var _a = (0, login_1.default)(req.body), errors = _a.errors, isValid = _a.isValid;
    // Check validation
    if (!isValid) {
        return (0, makeResponse_1.default)(res, 400, "Validation Failed", false, true);
    }
    var _b = req.body, email = _b.email, password = _b.password;
    user_1.default.find({ email: email })
        .exec()
        .then(function (users) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (users.length !== 1) {
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Unauthorized", false, true)];
            }
            bcryptjs_1.default.compare(password, users[0].password, function (error, result) {
                if (!result) {
                    return (0, makeResponse_1.default)(res, 400, "Unauthorized", false, true);
                }
                else if (result) {
                    (0, signJWT_1.default)(users[0], function (_error, token) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (_error) {
                                logging_1.default.error(NAMESPACE, 'Unable to sign token: ', _error);
                                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Unauthorized", false, true)];
                            }
                            else if (token) {
                                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Authentication Successful", { user: users[0], token: token }, false)];
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
            });
            return [2 /*return*/];
        });
    }); }).catch(function (error) {
        return (0, makeResponse_1.default)(res, 400, error.message, null, true);
    });
};
exports.default = {
    validateToken: validateToken,
    login: login,
    register: register
};
