"use strict";
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
var slot_1 = __importDefault(require("../../models/doctors/slot"));
var makeResponse_1 = __importStar(require("../../functions/makeResponse"));
var slot_2 = require("../../constants/slot");
var statusCode_1 = require("../../constants/statusCode");
var NAMESPACE = "Slot";
var createSlot = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, from, to, doctorId, hospitalId, type, newSlot;
    return __generator(this, function (_b) {
        _a = req.body, from = _a.from, to = _a.to, doctorId = _a.doctorId, hospitalId = _a.hospitalId, type = _a.type;
        if (type === slot_2.SlotTypes.PCR_TEST || type === slot_2.SlotTypes.PCR_VACCINATION) {
            if (!(from && to && hospitalId)) {
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", null, true)];
            }
        }
        else {
            if (!(from && to && doctorId && hospitalId)) {
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", null, true)];
            }
        }
        try {
            newSlot = new slot_1.default({
                from: new Date(from), to: new Date(to),
                doctorId: doctorId,
                hospitalId: hospitalId,
                type: type ? type : slot_2.SlotTypes.DOCTOR
            });
            newSlot.save().then(function (result) {
                return (0, makeResponse_1.default)(res, 200, "Doctor", result, false);
            }).catch(function (err) {
                return (0, makeResponse_1.default)(res, 400, "Problem while creating the slot", null, true);
            });
        }
        catch (err) {
            // @ts-ignore
            return [2 /*return*/, (0, makeResponse_1.default)(res, 400, err.message, null, true)];
        }
        return [2 /*return*/];
    });
}); };
var getDoctorAvailableSlots = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctorId, _a, startDate, endDate, slots, slots, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                doctorId = req.params.doctorId;
                _a = req.body, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(startDate === undefined || endDate === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, slot_1.default.find({ status: slot_2.SlotStatus.AVAILABLE, doctorId: doctorId }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 2:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's Available Slots", slots, false)];
            case 3: return [4 /*yield*/, slot_1.default.find({
                    // @ts-ignore
                    status: slot_2.SlotStatus.AVAILABLE,
                    doctorId: doctorId,
                    to: {
                        // @ts-ignore
                        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                        $lte: new Date(new Date(endDate).setHours(23, 59, 59))
                    }
                }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 4:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's Available Slots", slots, false)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_1.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getDoctorBookedSlots = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctorId, _a, startDate, endDate, slots, slots, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                doctorId = req.params.doctorId;
                _a = req.body, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(startDate === undefined || endDate === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, slot_1.default.find({ status: slot_2.SlotStatus.BOOKED, doctorId: doctorId }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 2:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's Booked Slots", slots, false)];
            case 3: return [4 /*yield*/, slot_1.default.find({
                    // @ts-ignore
                    status: slot_2.SlotStatus.BOOKED,
                    doctorId: doctorId,
                    to: {
                        // @ts-ignore
                        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                        $lte: new Date(new Date(endDate).setHours(23, 59, 59))
                    }
                }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 4:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's Booked Slots", slots, false)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_2.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getDoctorAllSlots = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var doctorId, _a, startDate, endDate, slots, slots, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                doctorId = req.params.doctorId;
                _a = req.body, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(startDate === undefined || endDate === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, slot_1.default.find({ doctorId: doctorId }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 2:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's All Slots", slots, false)];
            case 3: return [4 /*yield*/, slot_1.default.find({
                    // @ts-ignore
                    doctorId: doctorId,
                    to: {
                        // @ts-ignore
                        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                        $lte: new Date(new Date(endDate).setHours(23, 59, 59))
                    }
                }).populate('doctorId').populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 4:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Doctor's All Slots", slots, false)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_3 = _b.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_3.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getHospitalPCRTestSlots = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hospitalId, _a, startDate, endDate, slots, slots, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                hospitalId = req.params.hospitalId;
                _a = req.body, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(startDate === undefined || endDate === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, slot_1.default.find({ hospitalId: hospitalId, type: slot_2.SlotTypes.PCR_TEST }).populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 2:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Hospital's PCR Test Slots", slots, false)];
            case 3: return [4 /*yield*/, slot_1.default.find({
                    // @ts-ignore
                    hospitalId: hospitalId,
                    type: slot_2.SlotTypes.PCR_TEST,
                    to: {
                        // @ts-ignore
                        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                        $lte: new Date(new Date(endDate).setHours(23, 59, 59))
                    }
                }).populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 4:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Hospital's PCR Test Slots", slots, false)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _b.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_4.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getHospitalPCRVaccinationSlots = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hospitalId, _a, startDate, endDate, slots, slots, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                hospitalId = req.params.hospitalId;
                _a = req.body, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(startDate === undefined || endDate === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, slot_1.default.find({ hospitalId: hospitalId, type: slot_2.SlotTypes.PCR_VACCINATION }).populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 2:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Hospital's PCR Vaccination Slots", slots, false)];
            case 3: return [4 /*yield*/, slot_1.default.find({
                    // @ts-ignore
                    hospitalId: hospitalId,
                    type: slot_2.SlotTypes.PCR_VACCINATION,
                    to: {
                        // @ts-ignore
                        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                        $lte: new Date(new Date(endDate).setHours(23, 59, 59))
                    }
                }).populate('hospitalId').populate('patientId').populate('familyMemberId')];
            case 4:
                slots = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Hospital's PCR Vaccination Slots", slots, false)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_5 = _b.sent();
                // @ts-ignore
                return [2 /*return*/, (0, makeResponse_1.sendErrorResponse)(res, 400, err_5.message, statusCode_1.SERVER_ERROR_CODE)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    createSlot: createSlot,
    getDoctorAllSlots: getDoctorAllSlots,
    getDoctorAvailableSlots: getDoctorAvailableSlots,
    getDoctorBookedSlots: getDoctorBookedSlots,
    getHospitalPCRTestSlots: getHospitalPCRTestSlots,
    getHospitalPCRVaccinationSlots: getHospitalPCRVaccinationSlots
};
