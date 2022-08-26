import app from './../index'
import supertest from "supertest";

const request = supertest(app);

describe("Simple test", () => {
    it("should return Hello, World", async () => {
        const response = await request.get('/');
        expect(response.statusCode).toBe(200);
    })
})