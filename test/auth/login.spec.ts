import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";
import * as argonLib from "../../src/lib/argon";

const reqBody = {
  email: "mock@mail.com",
  password: "mockPassword123",
};

describe("POST /auth/login", () => {
  it("should login successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should throw error if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid email address");
  });

  it("should throw error if password is incorrect", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValueOnce(false);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Incorrect password");
  });
});
