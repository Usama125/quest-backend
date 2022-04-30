"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateSpecialityInput = function (data) {
    var errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !(0, is_empty_1.default)(data.name) ? data.name : "";
    data.tags = !(0, is_empty_1.default)(data.tags) ? data.tags : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (validator_1.default.isEmpty(data.tags)) {
        errors.tags = "Tags field is required";
    }
    return {
        errors: errors,
        isValid: (0, is_empty_1.default)(errors)
    };
};
exports.default = validateSpecialityInput;
