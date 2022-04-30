"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var town_1 = __importDefault(require("../controllers/town"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var router = express_1.default.Router();
router.get('/', extractJWT_1.default, town_1.default.getTowns);
router.post('/', extractJWT_1.default, town_1.default.createTown);
router.put('/:id', extractJWT_1.default, town_1.default.updateTown);
router.delete('/:id', extractJWT_1.default, town_1.default.deleteTown);
module.exports = router;
