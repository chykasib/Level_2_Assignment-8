"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const middleware_1 = __importDefault(require("../../middleware/middleware"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), profile_controller_1.UserProfileController.getUserProfileData);
exports.UserProfileRoutes = router;
