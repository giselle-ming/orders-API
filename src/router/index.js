"use strict";

const { Router } = require("express");
const OrderController = require("../controllers/order");
const GiftController = require("../controllers/gift");
const isAuthenticated = require("../middleware/isAuthenticated");

const orderRouter = Router();

orderRouter.use(isAuthenticated);

orderRouter.get("/", OrderController.getAll);
orderRouter.get("/:id", OrderController.getOne);
orderRouter.post("/", OrderController.create);
orderRouter.put("/:id", OrderController.replace);
orderRouter.patch("/:id", OrderController.update);
orderRouter.delete("/:id", OrderController.deleteOne);

orderRouter.get("/:id/gift", GiftController.getAll);
orderRouter.get("/:id/gift/:giftId", GiftController.getOne);
orderRouter.post("/:id/gift", GiftController.create);
orderRouter.patch("/:id/gift/:giftId", GiftController.update);
orderRouter.delete("/:id/gift/:giftId", GiftController.deleteOne);

module.exports = orderRouter;
