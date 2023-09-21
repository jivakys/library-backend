const express = require("express");
const {
  allOrdersData,
  createOrders,
} = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/orders", allOrdersData);
orderRouter.post("/order", createOrders);

module.exports = { orderRouter };
