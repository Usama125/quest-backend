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
var hospital_1 = __importDefault(require("../../models/hospital/hospital"));
var user_1 = __importDefault(require("../../models/user"));
var makeResponse_1 = __importStar(require("../../functions/makeResponse"));
var user_2 = __importDefault(require("../user"));
var roles_1 = require("../../constants/roles");
var config_1 = __importDefault(require("../../config/config"));
var hospitalRegisteration_1 = require("../../validation/hospitalRegisteration");
var doctor_1 = __importDefault(require("../../models/doctors/doctor"));
var speciality_1 = __importDefault(require("../../models/doctors/speciality"));
var statusCode_1 = require("../../constants/statusCode");
var cloudinary_1 = __importDefault(require("cloudinary"));
var NAMESPACE = "Hospital";
var createHospital = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, errors, isValid, _b, email, phoneNo, password, name, tradeLicenseNo, issueDate, expiryDate, location, address, state, type;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = (0, hospitalRegisteration_1.validateHospitalRegisteration)(req.body), errors = _a.errors, isValid = _a.isValid;
                // Check validation
                if (!isValid) {
                    return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", errors, true)];
                }
                _b = req.body, email = _b.email, phoneNo = _b.phoneNo, password = _b.password, name = _b.name, tradeLicenseNo = _b.tradeLicenseNo, issueDate = _b.issueDate, expiryDate = _b.expiryDate, location = _b.location, address = _b.address, state = _b.state, type = _b.type;
                return [4 /*yield*/, user_1.default.find({ email: email }).then(function (result) {
                        if (result.length === 0) {
                            // @ts-ignore
                            var newHospital = new hospital_1.default({
                                _id: new mongoose_1.default.Types.ObjectId(),
                                type: type,
                                category: null, addons: [],
                                phoneNo: phoneNo,
                                email: email,
                                name: name,
                                tradeLicenseNo: tradeLicenseNo,
                                issueDate: issueDate,
                                expiryDate: expiryDate,
                                address: address,
                                state: state,
                                location: {
                                    "type": "Point",
                                    "coordinates": location
                                }
                            });
                            return newHospital.save()
                                .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, user_2.default.createUserFromEmailAndPassword(req, res, email, password, name, "", "", roles_1.Roles.HOSPITAL, result._id)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Hospital Created Successfully", result, false)];
                                    }
                                });
                            }); })
                                .catch(function (err) {
                                return (0, makeResponse_1.default)(res, 400, err.message, null, true);
                            });
                        }
                        else {
                            return (0, makeResponse_1.default)(res, 400, "Email already exists", null, true);
                        }
                    })];
            case 1:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
var getAllHospitals = function (req, res, next) {
    hospital_1.default.find({})
        .then(function (result) {
        return (0, makeResponse_1.default)(res, 200, "All Hospitals", result, false);
    })
        .catch(function (err) {
        return (0, makeResponse_1.default)(res, 400, err.message, null, true);
    });
};
var getSingleHospital = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, doctor_1.default.find({ hospitalId: req.params.id }).populate('hospitalId')];
            case 1:
                doctors = _a.sent();
                hospital_1.default.findById({ _id: req.params.id }).populate("services")
                    .then(function (data) {
                    return (0, makeResponse_1.default)(res, 200, "Hospital", { hospital: data, doctors: doctors }, false);
                }).catch(function (err) {
                    return (0, makeResponse_1.default)(res, 400, err.message, null, true);
                });
                return [2 /*return*/];
        }
    });
}); };
var getHospitalDetail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, hospitalDetail, hospitalDoctors, specialities_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, hospital_1.default.findById({ _id: id }).populate("services")];
            case 2:
                hospitalDetail = _a.sent();
                return [4 /*yield*/, doctor_1.default.find({ hospitalId: id }).populate("specialityId")];
            case 3:
                hospitalDoctors = _a.sent();
                specialities_1 = [];
                // @ts-ignore
                if ((hospitalDoctors === null || hospitalDoctors === void 0 ? void 0 : hospitalDoctors.length) !== 0) {
                    // @ts-ignore
                    hospitalDoctors === null || hospitalDoctors === void 0 ? void 0 : hospitalDoctors.forEach(function (doctor) {
                        // @ts-ignore
                        if (specialities_1.filter(function (sp) { var _a; return sp === ((_a = doctor === null || doctor === void 0 ? void 0 : doctor.specialityId) === null || _a === void 0 ? void 0 : _a.name); }).length === 0) {
                            // @ts-ignore
                            specialities_1.push(doctor.specialityId.name);
                        }
                    });
                }
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Hospital", { hospitalDetail: hospitalDetail, hospitalDoctors: hospitalDoctors, specialities: specialities_1 }, false)];
            case 4:
                err_1 = _a.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, err_1.message, null, true)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateHospital = function (req, res, next) {
    // This _id is Hospital User ID
    var _id = res.locals.jwt._id;
    // This id is updated hospital itself id 
    var id = req.params.id;
    var update = JSON.parse(JSON.stringify(__assign({}, req.body)));
    update.password && delete update.password;
    var filter = { _id: id };
    user_2.default.updateUser(req, res, _id, req.body);
    hospital_1.default.findOneAndUpdate(filter, update).then(function (updatedHospital) {
        return (0, makeResponse_1.default)(res, 200, "Hospital updated Successfully", updatedHospital, false);
    }).catch(function (err) {
        return (0, makeResponse_1.default)(res, 400, err.message, null, true);
    });
};
var deleteHospital = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, hospital, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, hospital_1.default.findByIdAndDelete(_id)];
            case 2:
                hospital = _a.sent();
                if (!hospital)
                    return [2 /*return*/, res.sendStatus(404)];
                return [4 /*yield*/, user_2.default.deleteUserWithEmail(hospital.email)];
            case 3:
                _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", hospital_1.default, false)];
            case 4:
                e_1 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var searchHospital = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchedText, searchedTextRegex, searchQuery, searchedHospitalList, specialitySearchQuery, searchSpecIds, filteredIds, searchedDoctorsIds, filteredHospitalIds, searchResults, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchedText = req.params.searchedText;
                searchedTextRegex = new RegExp(searchedText, 'i');
                searchQuery = [
                    { name: searchedTextRegex },
                    { location: searchedTextRegex },
                    { email: searchedTextRegex },
                    { tradeLicenseNo: searchedTextRegex }
                ];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, hospital_1.default.find({ $or: searchQuery })];
            case 2:
                searchedHospitalList = _a.sent();
                if (!(searchedHospitalList.length === 0)) return [3 /*break*/, 6];
                specialitySearchQuery = [
                    { name: searchedTextRegex },
                    { tags: searchedTextRegex },
                ];
                return [4 /*yield*/, speciality_1.default.find({ $or: specialitySearchQuery }).select('_id')
                    // @ts-ignore
                ];
            case 3:
                searchSpecIds = _a.sent();
                filteredIds = searchSpecIds.map(function (obj) { return obj._id; });
                return [4 /*yield*/, doctor_1.default.find({ specialityId: { $in: filteredIds } }).select('hospitalId')];
            case 4:
                searchedDoctorsIds = _a.sent();
                filteredHospitalIds = searchedDoctorsIds.map(function (obj) { return obj.hospitalId; });
                return [4 /*yield*/, hospital_1.default.find({ _id: { $in: filteredHospitalIds } })];
            case 5:
                searchResults = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Search Results", searchResults, false)];
            case 6: return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Search Results", searchedHospitalList, false)];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Error while searching hospital", null, true)];
            case 9: return [2 /*return*/];
        }
    });
}); };
var uploadHospitalImages = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, id, filter, update;
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
                update = { $push: { images: [result.url] } };
                hospital_1.default.update(filter, update).then(function (updatedHospital) {
                    return (0, makeResponse_1.default)(res, 200, "Hospital image uploaded Successfully", updatedHospital, false);
                }).catch(function (err) {
                    return (0, makeResponse_1.default)(res, 400, err.message, null, true);
                });
                return [2 /*return*/];
        }
    });
}); };
var filterHospital = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, checkedCategories, hospitalTypes, checkedAddons, filterQuery;
    return __generator(this, function (_b) {
        _a = req.body, checkedCategories = _a.checkedCategories, hospitalTypes = _a.hospitalTypes, checkedAddons = _a.checkedAddons;
        filterQuery = {
            $and: [
                checkedCategories.length > 0 ? { 'category': { $in: checkedCategories } } : {},
                hospitalTypes.length > 0 ? { 'type': { $in: hospitalTypes } } : {},
                checkedAddons.length > 0 ? { 'services': { $in: checkedAddons } } : {}
            ]
        };
        hospital_1.default.find(filterQuery).then(function (result) {
            return (0, makeResponse_1.default)(res, 200, "Filtered Hospital", result, false);
        }).catch(function (err) {
            return (0, makeResponse_1.default)(res, 400, err.message, null, true);
        });
        return [2 /*return*/];
    });
}); };
var getHospitalDoctors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctors, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, doctor_1.default.find({ hospitalId: req.params.hospitalId }).populate("specialityId").populate("hospitalId")];
            case 1:
                doctors = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Filtered Hospital", doctors, false)];
            case 2:
                err_3 = _a.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_3.message, statusCode_1.SERVER_ERROR_CODE)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    createHospital: createHospital,
    getAllHospitals: getAllHospitals,
    getSingleHospital: getSingleHospital,
    updateHospital: updateHospital,
    deleteHospital: deleteHospital,
    searchHospital: searchHospital,
    uploadHospitalImages: uploadHospitalImages,
    filterHospital: filterHospital,
    getHospitalDetail: getHospitalDetail,
    getHospitalDoctors: getHospitalDoctors
};
