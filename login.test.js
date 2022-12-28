/* eslint-disable no-undef */
require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const app = require("./app");

const testUser = {
  email: "test@gmail.com",
  password: "12345678A",
};

describe("Testing the route to login", () => {
  beforeAll(async () => {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Login user test", async () => {
    const response = await request(app).post("/api/users/login").send(testUser);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    console.log(response.body);
  });
});
