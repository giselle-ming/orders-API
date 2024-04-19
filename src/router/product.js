"use strict";

const { Router } = require("express");
const ProductController = require("../controllers/product");
const isAuthenticated = require("../middleware/isAuthenticated");

const productRouter = Router();

productRouter.use(isAuthenticated);

productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getOne);
productRouter.post("/", ProductController.create);
productRouter.put("/:id", ProductController.replace);
productRouter.patch("/:id", ProductController.update);
productRouter.delete("/:id", ProductController.deleteOne);

module.exports = productRouter;
