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
var game_1 = __importDefault(require("../models/game"));
var NAMESPACE = "Game";
var createGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, gameTypeId, towns, durationType, duration, introduction, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, gameTypeId = _a.gameTypeId, towns = _a.towns, durationType = _a.durationType, duration = _a.duration, introduction = _a.introduction;
                if (!(name && gameTypeId && towns && introduction)) return [3 /*break*/, 3];
                return [4 /*yield*/, new game_1.default({ name: name, gameTypeId: gameTypeId, towns: towns, durationType: durationType, duration: duration, introduction: introduction }).save()];
            case 1:
                _b.sent();
                return [4 /*yield*/, game_1.default.find({}).populate("gameTypeId").populate("towns")];
            case 2:
                result = _b.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 201, "Game Created Successfully", result, false)];
            case 3: return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Validation Failed", null, true)];
        }
    });
}); };
var getGames = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, game_1.default.find({}).populate("gameTypeId").populate("towns")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Games", result, false)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 400, "Problem while getting games", null, true)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, filter, update, updatedGames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                filter = { _id: id };
                update = __assign({}, req.body);
                return [4 /*yield*/, game_1.default.findOneAndUpdate(filter, update, { upsert: true })];
            case 1:
                _a.sent();
                return [4 /*yield*/, game_1.default.find({}).populate('gameTypeId').populate("towns")];
            case 2:
                updatedGames = _a.sent();
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Updated Successfully", updatedGames, false)];
        }
    });
}); };
var deleteGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, games, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, game_1.default.findByIdAndDelete(_id).populate("gameTypeId").populate("towns")];
            case 2:
                games = _a.sent();
                if (!games)
                    return [2 /*return*/, res.sendStatus(404)];
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", games, false)];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getSingleGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, game, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, game_1.default.findById(_id).populate("gameTypeId").populate("towns")];
            case 2:
                game = _a.sent();
                if (!game)
                    return [2 /*return*/, res.sendStatus(404)];
                return [2 /*return*/, (0, makeResponse_1.default)(res, 200, "Deleted Successfully", game, false)];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    createGame: createGame,
    getGames: getGames,
    updateGame: updateGame,
    deleteGame: deleteGame,
    getSingleGame: getSingleGame
};
