"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var gameType_1 = __importDefault(require("../controllers/gameType"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var router = express_1.default.Router();
router.get('/', extractJWT_1.default, gameType_1.default.getGameTypes);
router.post('/', extractJWT_1.default, gameType_1.default.createGameType);
router.put('/:id', extractJWT_1.default, gameType_1.default.updateGameType);
router.delete('/:id', extractJWT_1.default, gameType_1.default.deleteGameType);
module.exports = router;
