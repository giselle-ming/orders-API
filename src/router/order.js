"use strict";

const { Router } = require("express");
const OrderController = require("../controllers/order");
const isAuthenticated = require("../middleware/isAuthenticated");

const orderRouter = Router();

orderRouter.use(isAuthenticated);

orderRouter.get("/", OrderController.getAll);
orderRouter.get("/:id", OrderController.getOne);
orderRouter.post("/", OrderController.create);
orderRouter.put("/:id", OrderController.replace);
orderRouter.patch("/:id", OrderController.update);
orderRouter.delete("/:id", OrderController.deleteOne);

module.exports = orderRouter;
