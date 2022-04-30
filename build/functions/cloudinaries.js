"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var config_1 = __importDefault(require("../config/config"));
// @ts-ignore
cloudinary_1.default.config({
    cloud_name: config_1.default.cloudinary.name,
    api_key: config_1.default.cloudinary.apiKey,
    api_secret: config_1.default.cloudinary.secretKey
});
var uploads = function (file, folder) {
    return new Promise(function (resolve) {
        // @ts-ignore
        cloudinary_1.default.uploader.upload(file, function (result) {
            resolve({
                url: result.url
            });
        }, {
            resource_type: "auto",
            folder: folder
        });
    });
};
exports.uploads = uploads;
