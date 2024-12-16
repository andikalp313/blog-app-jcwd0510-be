"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const cloudinary_1 = require("../../lib/cloudinary");
const createBlogService = (body, thumbnail, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = body;
        const blog = yield prisma_1.default.blog.findFirst({
            where: { title },
        });
        if (blog) {
            throw new Error("Title already in use");
        }
        const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(thumbnail);
        return yield prisma_1.default.blog.create({
            data: Object.assign(Object.assign({}, body), { thumbnail: secure_url, userId }),
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createBlogService = createBlogService;
