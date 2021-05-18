"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const shipmentSchema = require("../schemas/shipmentSchema.json");

const { BadRequestError } = require("../expressError");
const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shipmentSchema);
  console.log("result.errors --->", result.errors);
  if (!result.valid) {
  let errs = result.errors.map(err => err.stack);
  throw new BadRequestError(errs);
  }
  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;