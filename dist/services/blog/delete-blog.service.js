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
exports.deleteBlogService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const deleteBlogService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma_1.default.blog.findFirst({
            where: { id },
        });
        if (!blog) {
            throw new Error("Invalid blog id");
        }
        if (blog.userId !== userId) {
            throw new Error("Unauthorized");
        }
        yield prisma_1.default.blog.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { message: "Delete blog success." };
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBlogService = deleteBlogService;
