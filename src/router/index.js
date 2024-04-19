"use strict";

const { Router } = require("express");
const OrderController = require("../controllers/order");
const ProductController = require("../controllers/pizza"); // changed from gift to product
const isAuthenticated = require("../middleware/isAuthenticated");

const orderRouter = Router();
const productRouter = Router(); // changed from pizzaRouter to productRouter

orderRouter.use(isAuthenticated);
productRouter.use(isAuthenticated); // changed from pizzaRouter to productRouter

orderRouter.get("/", OrderController.getAll);
orderRouter.get("/:id", OrderController.getOne);
orderRouter.post("/", OrderController.create);
orderRouter.put("/:id", OrderController.replace);
orderRouter.patch("/:id", OrderController.update);
orderRouter.delete("/:id", OrderController.deleteOne);

productRouter.get("/products", ProductController.getAll); // changed from pizzaRouter to productRouter
productRouter.get("/products/:id", ProductController.getOne); // changed from pizzaRouter to productRouter
productRouter.post("/products", ProductController.create); // changed from pizzaRouter to productRouter
productRouter.put("/products/:id", ProductController.replace); // changed from pizzaRouter to productRouter
productRouter.patch("/products/:id", ProductController.update); // changed from pizzaRouter to productRouter
productRouter.delete("/products/:id", ProductController.deleteOne); // changed from pizzaRouter to productRouter

module.exports = {
  orderRouter,
  productRouter, // changed from pizzaRouter to productRouter
};
