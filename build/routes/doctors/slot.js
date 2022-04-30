"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var slot_1 = __importDefault(require("../../controllers/doctors/slot"));
var extractJWT_1 = __importDefault(require("../../middleware/extractJWT"));
var router = express_1.default.Router();
router.post('/', extractJWT_1.default, slot_1.default.createSlot);
router.post('/all/doctor/:doctorId', extractJWT_1.default, slot_1.default.getDoctorAllSlots);
router.post('/available/doctor/:doctorId', extractJWT_1.default, slot_1.default.getDoctorAvailableSlots);
router.post('/booked/doctor/:doctorId', extractJWT_1.default, slot_1.default.getDoctorBookedSlots);
router.post('/PCRTests/hospital/:hospitalId', extractJWT_1.default, slot_1.default.getHospitalPCRTestSlots);
router.post('/PCRVaccination/hospital/:hospitalId', extractJWT_1.default, slot_1.default.getHospitalPCRVaccinationSlots);
module.exports = router;
