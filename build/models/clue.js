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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var ClueSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    hint_1: {
        type: String,
        required: true
    },
    hint_2: {
        type: String,
        required: false
    },
    gameId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Game",
        index: false
    },
    type: {
        type: String,
        required: false
    },
    urls: {
        type: [{
                url: {
                    type: String
                }
            }],
        required: false
    },
    text: {
        type: String,
        required: false
    },
    ans: {
        type: String,
        required: false
    },
    clue_type: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Clue', ClueSchema);
