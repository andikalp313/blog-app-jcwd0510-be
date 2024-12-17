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
exports.getBlogsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const getBlogsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortBy, sortOrder, take, search } = query;
        const whereClause = {
            deletedAt: null,
        };
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
            ];
        }
        const blogs = yield prisma_1.default.blog.findMany({
            where: whereClause,
            skip: (page - 1) * take, //offset
            take: take, //limit
            orderBy: { [sortBy]: sortOrder }, // sorting
            include: { user: { select: { name: true } } },
        });
        const count = yield prisma_1.default.blog.count({ where: whereClause });
        return {
            data: blogs,
            meta: { page, take, total: count },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getBlogsService = getBlogsService;
