"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var clue_1 = __importDefault(require("../controllers/clue"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var multer_1 = __importDefault(require("../multer"));
var router = express_1.default.Router();
router.get('/:gameId', extractJWT_1.default, clue_1.default.getGameClues);
router.get('/getSingle/:id', extractJWT_1.default, clue_1.default.getClueDetail);
router.post('/', multer_1.default.array('file', 20), clue_1.default.createClue);
router.delete('/deleteClueFile/:clueId/:fileId', extractJWT_1.default, clue_1.default.deleteClueFile);
router.put('/:id', multer_1.default.array('file', 20), clue_1.default.updateClue);
router.delete('/:id', extractJWT_1.default, clue_1.default.deleteClue);
module.exports = router;
