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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogController = exports.createBlogController = exports.getBlogController = exports.getBlogsController = void 0;
const get_blogs_service_1 = require("../services/blog/get-blogs.service");
const create_blog_service_1 = require("../services/blog/create-blog.service");
const get_blog_service_1 = require("../services/blog/get-blog.service");
const delete_blog_service_1 = require("../services/blog/delete-blog.service");
const getBlogsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 3,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "createdAt",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
        };
        const result = yield (0, get_blogs_service_1.getBlogsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogsController = getBlogsController;
const getBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield (0, get_blog_service_1.getBlogService)(id);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogController = getBlogController;
const createBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const files = req.files;
        const result = yield (0, create_blog_service_1.createBlogService)(req.body, (_a = files.thumbnail) === null || _a === void 0 ? void 0 : _a[0], res.locals.user.id);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createBlogController = createBlogController;
const deleteBlogController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userId = Number(res.locals.user.id);
        const result = yield (0, delete_blog_service_1.deleteBlogService)(id, userId);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBlogController = deleteBlogController;
