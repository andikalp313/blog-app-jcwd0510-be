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
const app_1 = __importDefault(require("../../src/app"));
const prisma_1 = require("../prisma");
const supertest_1 = __importDefault(require("supertest"));
const reqBody = {
    name: "mock name",
    email: "mock@mail.com",
    password: "mockPassword123",
};
describe("POST /auth/register", () => {
    it("should register successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        prisma_1.prismaMock.user.findFirst.mockResolvedValueOnce(null);
        prisma_1.prismaMock.user.create.mockResolvedValueOnce(Object.assign(Object.assign({}, reqBody), { id: 1, createdAt: new Date(), updatedAt: new Date() }));
        const response = yield (0, supertest_1.default)(app_1.default).post("/auth/register").send(reqBody);
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
    }));
    it("should throw error if email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        prisma_1.prismaMock.user.findFirst.mockResolvedValueOnce(Object.assign(Object.assign({}, reqBody), { id: 1, createdAt: new Date(), updatedAt: new Date() }));
        const response = yield (0, supertest_1.default)(app_1.default).post("/auth/register").send(reqBody);
        expect(response.status).toBe(400);
        expect(response.text).toBe("Email already exists");
    }));
});
