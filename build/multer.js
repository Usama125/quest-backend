"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve(__dirname, './uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        //reject file
        cb({ message: 'Unsupported file format' }, false);
    }
};
var multipleUpload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10024 * 10024 },
    // fileFilter: fileFilter
});
exports.default = multipleUpload;
