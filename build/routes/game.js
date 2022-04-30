"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var game_1 = __importDefault(require("../controllers/game"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var router = express_1.default.Router();
router.get('/', extractJWT_1.default, game_1.default.getGames);
router.get('/:id', extractJWT_1.default, game_1.default.getSingleGame);
router.post('/', extractJWT_1.default, game_1.default.createGame);
router.put('/:id', extractJWT_1.default, game_1.default.updateGame);
router.delete('/:id', extractJWT_1.default, game_1.default.deleteGame);
module.exports = router;
