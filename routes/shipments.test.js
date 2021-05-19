"use strict";
/** importing and setting up mocks FIRST */
let mockedShipitApi = require("../shipItApi");
mockedShipitApi.shipProduct = jest.fn()
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");

// these imports must happen after mock imports
const axiosMock = new AxiosMockAdapter(axios);
const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    mockedShipitApi.shipProduct.mockReturnValue(4000)
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 900,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance.productId must be greater than or equal to 1000", "instance requires property \"name\""]
    );
  });
});
