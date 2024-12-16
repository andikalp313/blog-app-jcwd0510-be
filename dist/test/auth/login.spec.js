"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const argonLib = __importStar(require("../../src/lib/argon"));
const reqBody = {
    email: "mock@mail.com",
    password: "mockPassword123",
};
describe("POST /auth/login", () => {
    it("should login successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        prisma_1.prismaMock.user.findFirst.mockResolvedValueOnce(Object.assign(Object.assign({}, reqBody), { id: 1, name: "mock name", createdAt: new Date(), updatedAt: new Date() }));
        //before
        beforeAll(() => {
            //ini bakalan dijalankan sebelum testing pertama dijalankan
        });
        beforeEach(() => {
            //ini bakalan dijalankan sebelum setiap testing
        });
        afterEach(() => {
            //ini bakalan dijalankan setelah setiap testing
        });
        afterAll(() => {
            //ini bakalan dijalankan setelah testing pertama dijalankan
        });
        //truncate menghapus isi data di table tapi struktur tablenya tidak dihapus, cuma datanya saja yang hilang
        jest.spyOn(argonLib, "comparePassword").mockResolvedValueOnce(true);
        const response = yield (0, supertest_1.default)(app_1.default).post("/auth/login").send(reqBody);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    it("should throw error if email not found", () => __awaiter(void 0, void 0, void 0, function* () {
        prisma_1.prismaMock.user.findFirst.mockResolvedValueOnce(null);
        const response = yield (0, supertest_1.default)(app_1.default).post("/auth/login").send(reqBody);
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid email address");
    }));
    it("should throw error if password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        prisma_1.prismaMock.user.findFirst.mockResolvedValueOnce(Object.assign(Object.assign({}, reqBody), { id: 1, name: "mock name", createdAt: new Date(), updatedAt: new Date() }));
        jest.spyOn(argonLib, "comparePassword").mockResolvedValueOnce(false);
        const response = yield (0, supertest_1.default)(app_1.default).post("/auth/login").send(reqBody);
        expect(response.status).toBe(400);
        expect(response.text).toBe("Incorrect password");
    }));
});
