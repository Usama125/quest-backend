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
var makeResponse_1 = __importDefault(require("../functions/makeResponse"));
var clue_1 = __importDefault(require("../models/clue"));
var cloudinaries_1 = require("../functions/cloudinaries");
var fs_1 = __importDefault(require("fs"));
var NAMESPACE = "Clue";
// const check = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		// @ts-ignore
// 		const uploader = async (path: any) => await uploads(path, "Images");
// 		if (req.method === 'POST') {
// 			const urls = []
// 			const files = req.files;
// 			console.log("Files => ", files)
// 			// @ts-ignore
// 			for (const file of files) {
// 				const { path } = file;
// 				const newPath = await uploader(path)
// 				urls.push(newPath)
// 				fs.unlinkSync(path)
// 			}
// 			res.status(200).json({
// 				message: 'images uploaded successfully',
// 				data: urls
// 			})
// 		} else {
// 			res.status(405).json({
// 				err: `${req.method} method not allowed`
// 			})
// 		}
// 	} catch (err) {
// 		console.log("err => ", err);
// 		res.status(400).json({
// 			err: err
// 		})
// 	}
// }
var deleteClueFile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clueId, fileId_1, clue, clueFiles, filter, update, updatedClue, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.params, clueId = _a.clueId, fileId_1 = _a.fileId;
                return [4 /*yield*/, clue_1.default.findById(clueId)];
            case 1:
                clue = _b.sent();
                if (!clue) return [3 /*break*/, 4];
                clueFiles = clue.urls.filter(function (url) { return url._id.toString() !== fileId_1; });
                filter = { _id: clueId };
                update = { urls: clueFiles };
                return [4 /*yield*/, clue_1.default.findOneAndUpdate(filter, update, { upsert: true })];
            case 2:
                _b.sent();
                return [4 /*yield*/, clue_1.default.findById(clueId)];
            case 3:
                updatedClue = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "File ", updatedClue, false)];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "File Not exists", err_1, true)];
            case 6: return [2 /*return*/];
        }
    });
}); };
var createClue = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, hint_1, hint_2, gameId, type, text, ans, clue_type, uploader, urls, files, _i, files_1, file, path, newPath, clues, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, hint_1 = _a.hint_1, hint_2 = _a.hint_2, gameId = _a.gameId, type = _a.type, text = _a.text, ans = _a.ans, clue_type = _a.clue_type;
                uploader = function (path) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, cloudinaries_1.uploads)(path, "Images")];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                if (!(name && hint_1 && hint_2 && gameId && type && text && ans && clue_type)) return [3 /*break*/, 8];
                urls = [];
                files = req.files;
                _i = 0, files_1 = files;
                _b.label = 2;
            case 2:
                if (!(_i < files_1.length)) return [3 /*break*/, 5];
                file = files_1[_i];
                path = file.path;
                return [4 /*yield*/, uploader(path)];
            case 3:
                newPath = _b.sent();
                urls.push(newPath);
                fs_1.default.unlinkSync(path);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, new clue_1.default({ name: name, hint_1: hint_1, hint_2: hint_2, gameId: gameId, type: type, text: text, ans: ans, clue_type: clue_type, urls: urls }).save()];
            case 6:
                _b.sent();
                return [4 /*yield*/, clue_1.default.find({ gameId: gameId }).populate("gameId")];
            case 7:
                clues = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Clue Created Successfully", clues, false)];
            case 8: return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", null, true)];
            case 9: return [3 /*break*/, 11];
            case 10:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", err_2, true)];
            case 11: return [2 /*return*/];
        }
    });
}); };
var getGameClues = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                gameId = req.params.gameId;
                return [4 /*yield*/, clue_1.default.find({ gameId: gameId }).populate("gameId")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Clues", result, false)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Problem while getting Clues", null, true)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateClue = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, update, filter, uploader, urls, files, _i, files_2, file, path, newPath, updatedClue, updatedClues, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                update = JSON.parse(JSON.stringify(__assign({}, req.body)));
                filter = { _id: id };
                console.log("Files => ", req.files);
                if (!(((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 6];
                uploader = function (path) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, cloudinaries_1.uploads)(path, "Images")];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); };
                urls = [];
                files = req.files;
                _i = 0, files_2 = files;
                _b.label = 2;
            case 2:
                if (!(_i < files_2.length)) return [3 /*break*/, 5];
                file = files_2[_i];
                path = file.path;
                return [4 /*yield*/, uploader(path)];
            case 3:
                newPath = _b.sent();
                urls.push(newPath);
                fs_1.default.unlinkSync(path);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("URLS => ", urls);
                update = __assign(__assign({}, update), { $push: { urls: urls } });
                _b.label = 6;
            case 6: return [4 /*yield*/, clue_1.default.findOneAndUpdate(filter, update, { upsert: true })];
            case 7:
                updatedClue = _b.sent();
                return [4 /*yield*/, clue_1.default.find({ gameId: updatedClue.gameId }).populate('gameId')];
            case 8:
                updatedClues = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Updated Successfully", updatedClues, false)];
            case 9:
                err_4 = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, err_4.message, null, true)];
            case 10: return [2 /*return*/];
        }
    });
}); };
var deleteClue = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, clues, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, clue_1.default.findByIdAndDelete(_id).populate("gameId")];
            case 2:
                clues = _a.sent();
                if (!clues)
                    return [2 /*return*/, res.sendStatus(404)];
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", clues, false)];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getClueDetail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, clue, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, clue_1.default.findById(_id).populate("gameId")];
            case 2:
                clue = _a.sent();
                if (!clue)
                    return [2 /*return*/, res.sendStatus(404)];
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", clue, false)];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    createClue: createClue,
    getGameClues: getGameClues,
    updateClue: updateClue,
    deleteClue: deleteClue,
    getClueDetail: getClueDetail,
    deleteClueFile: deleteClueFile,
    // check
};
