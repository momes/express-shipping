"use strict";
/** importing and setting up mocks FIRST */
let { shipProduct, SHIPIT_SHIP_URL} = require("./shipItApi");
shipProduct = jest.fn()
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");

// these imports must happen after mock imports
const axiosMock = new AxiosMockAdapter(axios);
const request = require("supertest");
const app = require("./app")


test("shipProduct", async function () {

axiosMock.onPost(`${SHIPIT_SHIP_URL}`)
    .reply(200, {
      "receipt": {
        "itemId": 1000,
        "name": "name",
        "addr": "addr",
        "zip": "zip",
        "shipId": 6840
      } 
    });
const { shipProduct } = require("./shipItApi")    
const res = await shipProduct({
  productId: 1000,
  name: "Test Tester",
  addr: "100 Test St",
  zip: "12345-6789",
})

expect(res).toEqual(6840);
});


// test("shipProduct", async function () {

// axiosMock.onPost(`${SHIPIT_SHIP_URL}`)
//     .reply(200, { shipped: 4444 });
    
// const res = await shipProduct({
//   productId: 1000,
//   name: "Test Tester",
//   addr: "100 Test St",
//   zip: "12345-6789",
// })

// expect(res.body).toEqual({ shipped: 4444 });
// });



// test("shipProduct", async function () {
//   const shipId = await shipProduct({
//     productId: 1000,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });

//   expect(shipId).toEqual(expect.any(Number));
// });

