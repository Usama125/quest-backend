"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var mongoose_1 = __importDefault(require("mongoose"));
var patient_1 = __importDefault(require("../models/patient"));
var makeResponse_1 = __importStar(require("../functions/makeResponse"));
var user_1 = __importDefault(require("../controllers/user"));
var roles_1 = require("../constants/roles");
var config_1 = __importDefault(require("../config/config"));
var appointment_1 = __importDefault(require("../models/appointment"));
var nurse_1 = __importDefault(require("../models/nurse/nurse"));
var user_2 = __importDefault(require("../models/user"));
var utilities_1 = require("../functions/utilities");
var mailer_1 = require("../functions/mailer");
var pagination_1 = require("../constants/pagination");
var patientRegisteration_1 = require("../validation/patientRegisteration");
var statusCode_1 = require("../constants/statusCode");
var labRequest_1 = __importDefault(require("../models/labortories/labRequest"));
var QrPrescription_1 = __importDefault(require("../models/labortories/QrPrescription"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var signJWT_1 = __importDefault(require("../functions/signJWT"));
var slot_1 = __importDefault(require("../models/doctors/slot"));
var slot_2 = require("../constants/slot");
var family_1 = __importDefault(require("../models/family"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var NAMESPACE = "Patient";
var createPatient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, birthday, emiratesId, gender, location, phone, password, _b, errors, isValid, result, newPatient, savedPatient_1, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, birthday = _a.birthday, emiratesId = _a.emiratesId, gender = _a.gender, location = _a.location, phone = _a.phone, password = _a.password;
                _b = (0, patientRegisteration_1.validatePatientRegisteration)(req.body), errors = _b.errors, isValid = _b.isValid;
                // Check validation
                if (!isValid) {
                    // @ts-ignore
                    return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, Object.values(errors)[0], Object.values(errors)[0].includes("invalid") ? INVALID_VALUE_CODE : statusCode_1.PARAMETER_MISSING_CODE)];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_2.default.find({ $or: [{ email: email }, { emiratesId: emiratesId }] })];
            case 2:
                result = _c.sent();
                if (!(result.length === 0)) return [3 /*break*/, 4];
                newPatient = new patient_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthday: birthday,
                    gender: gender,
                    location: location,
                    phone: phone,
                    emiratesId: emiratesId
                });
                return [4 /*yield*/, newPatient.save()];
            case 3:
                savedPatient_1 = _c.sent();
                if (savedPatient_1) {
                    bcryptjs_1.default.hash(password, 10, function (hashError, hash) { return __awaiter(void 0, void 0, void 0, function () {
                        var _user;
                        return __generator(this, function (_a) {
                            if (hashError) {
                                return [2 /*return*/, false];
                            }
                            _user = new user_2.default({ _id: new mongoose_1.default.Types.ObjectId(), firstName: firstName, lastName: lastName, email: email, phoneNo: phone, password: hash, role: roles_1.Roles.PATIENT, emiratesId: emiratesId, referenceId: savedPatient_1._id });
                            _user.save().then(function (createdUser) {
                                // @ts-ignore
                                (0, signJWT_1.default)(createdUser, function (_error, token) {
                                    if (_error) {
                                        return (0, makeResponse_1.sendErrorResponse)(res, 400, "Unauthorized", statusCode_1.UNAUTHORIZED_CODE);
                                    }
                                    else if (token) {
                                        var options = {
                                            from: config_1.default.mailer.user,
                                            to: email,
                                            subject: "Welcome to Medicapp",
                                            text: "Your account account has been created as a patient, and your password is ".concat(password)
                                        };
                                        (0, mailer_1.sendEmail)(options);
                                        return (0, makeResponse_1.default)(res, 200, "Patient registered successfully", { bookmarks: { doctorIds: [], hospitalIds: [] }, user: savedPatient_1, familyMembers: [], token: token }, false);
                                    }
                                });
                            });
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, "Email OR Emirates ID already exists", statusCode_1.DUPLICATE_VALUE_CODE)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_1.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var createPatientFromNurse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, mobile, birthday, gender, location, emiratesId, password;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, mobile = _a.mobile, birthday = _a.birthday, gender = _a.gender, location = _a.location, emiratesId = _a.emiratesId;
                password = (0, utilities_1.getRandomPassword)();
                return [4 /*yield*/, user_2.default.find({ email: email }).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                        var newPatient, options;
                        return __generator(this, function (_a) {
                            if (result.length === 0) {
                                if (email && firstName && lastName && mobile) {
                                    newPatient = new patient_1.default({
                                        _id: new mongoose_1.default.Types.ObjectId(),
                                        birthday: birthday,
                                        gender: gender,
                                        location: location,
                                        email: email,
                                        password: password,
                                        firstName: firstName,
                                        lastName: lastName,
                                        phone: mobile,
                                        emiratesId: emiratesId
                                    });
                                    options = {
                                        from: config_1.default.mailer.user,
                                        to: email,
                                        subject: "Welcome to Medicapp",
                                        text: "Your account account has been created as a patient, and your password is ".concat(password)
                                    };
                                    (0, mailer_1.sendEmail)(options);
                                    return [2 /*return*/, newPatient.save()
                                            .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, user_1.default.createUserFromEmailAndPassword(req, res, email, password, firstName, lastName, "", roles_1.Roles.PATIENT, result._id)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Patient Created Successfully", result, false)];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) {
                                            return (0, makeResponse_1.sendErrorResponse)(res, 400, err.message, statusCode_1.SERVER_ERROR_CODE);
                                        })];
                                }
                                else {
                                    return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, "Validation Failed", statusCode_1.SERVER_ERROR_CODE)];
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
var getAllPatients = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, role, reference_id, _id, page, hospitalId, nurse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals.jwt, role = _a.role, reference_id = _a.reference_id, _id = _a._id;
                page = parseInt(req.query.page || "0");
                hospitalId = null;
                if (!(role === roles_1.Roles.NURSE)) return [3 /*break*/, 2];
                return [4 /*yield*/, nurse_1.default.findById(reference_id)];
            case 1:
                nurse = _b.sent();
                hospitalId = nurse.hospitalId;
                return [3 /*break*/, 3];
            case 2:
                if (role === roles_1.Roles.HOSPITAL) {
                    hospitalId = reference_id;
                }
                _b.label = 3;
            case 3:
                if (role === roles_1.Roles.DOCTOR) {
                    slot_1.default.find({ doctorId: reference_id, status: slot_2.SlotStatus.BOOKED })
                        .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                        var patients, patientIds, total, patientsArray;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    patients = result.map(function (item) { return (item.patientId); });
                                    patientIds = [];
                                    patients.map(function (item) {
                                        // @ts-ignore
                                        if (patientIds.filter(function (pat) { return pat.equals(item); }).length === 0) {
                                            patientIds.push(item);
                                        }
                                    });
                                    return [4 /*yield*/, patient_1.default.find({ '_id': { $in: patientIds } }).countDocuments({})];
                                case 1:
                                    total = _a.sent();
                                    return [4 /*yield*/, patient_1.default.find({ '_id': { $in: patientIds } }).limit(pagination_1.Pagination.PAGE_SIZE).skip(pagination_1.Pagination.PAGE_SIZE * page)];
                                case 2:
                                    patientsArray = _a.sent();
                                    return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "All Patients", { totalItems: total, totalPages: Math.ceil(total / pagination_1.Pagination.PAGE_SIZE), patients: patientsArray }, false)];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        return (0, makeResponse_1.sendErrorResponse)(res, 400, err.message, statusCode_1.SERVER_ERROR_CODE);
                    });
                }
                else {
                    slot_1.default.find({ hospitalId: hospitalId, status: slot_2.SlotStatus.BOOKED })
                        .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                        var patients, patientIds, total, patientsArray;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    patients = result.map(function (item) { return (item.patientId); });
                                    patientIds = [];
                                    patients.map(function (item) {
                                        // @ts-ignore
                                        if (patientIds.filter(function (pat) { return pat.equals(item); }).length === 0) {
                                            patientIds.push(item);
                                        }
                                    });
                                    return [4 /*yield*/, patient_1.default.find({ '_id': { $in: patientIds } }).countDocuments({})];
                                case 1:
                                    total = _a.sent();
                                    return [4 /*yield*/, patient_1.default.find({ '_id': { $in: patientIds } }).limit(pagination_1.Pagination.PAGE_SIZE).skip(pagination_1.Pagination.PAGE_SIZE * page)];
                                case 2:
                                    patientsArray = _a.sent();
                                    return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "All Patients", { totalItems: total, totalPages: Math.ceil(total / pagination_1.Pagination.PAGE_SIZE), patients: patientsArray }, false)];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        return (0, makeResponse_1.sendErrorResponse)(res, 400, err.message, statusCode_1.SERVER_ERROR_CODE);
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
var getSinglePatient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                doctors = null;
                return [4 /*yield*/, appointment_1.default.find({ patientId: req.params.id }).populate('doctorId')
                        .then(function (result) {
                        doctors = result.map(function (item) { return (item.doctorId); });
                        patient_1.default.findById({ _id: req.params.id })
                            .then(function (data) {
                            var newTemp = JSON.parse(JSON.stringify(data));
                            newTemp.doctors = doctors;
                            return (0, makeResponse_1.default)(res, 200, "Patient", newTemp, false);
                        }).catch(function (err) {
                            return (0, makeResponse_1.sendErrorResponse)(res, 400, err.message, statusCode_1.SERVER_ERROR_CODE);
                        });
                    })
                        .catch(function (err) {
                        return (0, makeResponse_1.sendErrorResponse)(res, 400, err.message, statusCode_1.SERVER_ERROR_CODE);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updatePatient = function (req, res, next) {
    var _id = res.locals.jwt._id;
    var id = req.params.id;
    var update = JSON.parse(JSON.stringify(__assign({}, req.body)));
    update.password && delete update.password;
    var filter = { _id: id };
    user_1.default.updateUser(req, res, _id, req.body);
    patient_1.default.findOneAndUpdate(filter, update, { new: true }).then(function (updatedPatient) {
        return (0, makeResponse_1.default)(res, 200, "Doctor updated Successfully", updatedPatient, false);
    }).catch(function (err) {
        return (0, makeResponse_1.default)(res, 400, err.message, null, true);
    });
};
var deletePatient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, patient, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, patient_1.default.findByIdAndDelete(_id)];
            case 2:
                patient = _a.sent();
                if (!patient)
                    return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, "Patient not found with this ID", statusCode_1.SERVER_ERROR_CODE)];
                return [4 /*yield*/, user_1.default.deleteUserWithEmail(patient.email)];
            case 3:
                _a.sent();
                return [4 /*yield*/, appointment_1.default.deleteMany({ patientId: patient._id })];
            case 4:
                _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", patient, false)];
            case 5:
                err_2 = _a.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_2.message, statusCode_1.SERVER_ERROR_CODE)];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getPatientAccountInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var patient, familyMembers, upcommingAppointments, labResults, qrPrescriptions, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, patient_1.default.findById({ _id: req.params.id })];
            case 1:
                patient = _a.sent();
                return [4 /*yield*/, family_1.default.find({ patientId: req.params.id })];
            case 2:
                familyMembers = _a.sent();
                return [4 /*yield*/, slot_1.default.find({ patientId: req.params.id })
                        .populate("patientId")
                        .populate("familyMemberId")
                        .populate("hospitalId")
                        .populate({
                        path: 'doctorId',
                        populate: [
                            { path: 'specialityId' },
                            { path: 'hospitalId' }
                        ]
                    })
                    // Get Lab Results
                ];
            case 3:
                upcommingAppointments = _a.sent();
                return [4 /*yield*/, labRequest_1.default.find({ patientId: req.params.id }).populate({
                        path: 'doctorId',
                        populate: [
                            { path: 'specialityId' },
                            { path: 'hospitalId' }
                        ]
                    })];
            case 4:
                labResults = _a.sent();
                return [4 /*yield*/, QrPrescription_1.default.find({ patientId: req.params.id })
                        .populate({
                        path: 'doctorId',
                        populate: [
                            { path: 'specialityId' },
                            { path: 'hospitalId' }
                        ]
                    })];
            case 5:
                qrPrescriptions = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Patient profile data", {
                        patient: patient,
                        upcommingAppointments: upcommingAppointments,
                        labResults: labResults,
                        qrPrescriptions: qrPrescriptions,
                        familyMembers: familyMembers
                    }, false)];
            case 6:
                err_3 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_3.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getLabResults = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var labResults, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, labRequest_1.default.find({ patientId: req.params.id }).populate({
                        path: 'doctorId',
                        populate: [
                            { path: 'specialityId' },
                            { path: 'hospitalId' }
                        ]
                    })];
            case 1:
                labResults = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Patient lab results", labResults, false)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_4.message, statusCode_1.SERVER_ERROR_CODE)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getQRPrescription = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var qrPrescriptions, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, QrPrescription_1.default.find({ patientId: req.params.id })
                        .populate({
                        path: 'doctorId',
                        populate: [
                            { path: 'specialityId' },
                            { path: 'hospitalId' }
                        ]
                    })];
            case 1:
                qrPrescriptions = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Patient lab results", qrPrescriptions, false)];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_5.message, statusCode_1.SERVER_ERROR_CODE)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var uploadProfilePic = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, id, filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // @ts-ignore
                cloudinary_1.default.v2.config({
                    cloud_name: config_1.default.cloudinary.name,
                    api_key: config_1.default.cloudinary.apiKey,
                    api_secret: config_1.default.cloudinary.secretKey
                });
                return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.file.path)];
            case 1:
                result = _a.sent();
                id = req.params.id;
                filter = { _id: id };
                // @ts-ignore
                patient_1.default.findOneAndUpdate(filter, { image: result.url }).then(function (updatedPatient) {
                    return (0, makeResponse_1.default)(res, 200, "Patient profile picture uploaded Successfully", updatedPatient, false);
                }).catch(function (err) {
                    return (0, makeResponse_1.default)(res, 400, err.message, null, true);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    createPatient: createPatient,
    getAllPatients: getAllPatients,
    getSinglePatient: getSinglePatient,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
    createPatientFromNurse: createPatientFromNurse,
    getPatientAccountInfo: getPatientAccountInfo,
    getLabResults: getLabResults,
    getQRPrescription: getQRPrescription,
    uploadProfilePic: uploadProfilePic
};
