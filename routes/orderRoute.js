const express = require("express");
const { auth } = require("../middleware/auth");

const {
  allOrdersData,
  createOrders,
} = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/orders", allOrdersData);
orderRouter.post("/order", auth, createOrders);

module.exports = { orderRouter };
