"use strict";

const { Router } = require("express");
const PersonController = require("../controllers/person");
const GiftController = require("../controllers/gift");
const isAuthenticated = require('../middleware/isAuthenticated');

const personRouter = Router();

personRouter.use(isAuthenticated)

personRouter.get("/", PersonController.getAll);
personRouter.get("/:id", PersonController.getOne);
personRouter.post("/", PersonController.create);
personRouter.put("/:id", PersonController.replace);
personRouter.patch("/:id", PersonController.update);
personRouter.delete("/:id", PersonController.deleteOne);

personRouter.get('/:id/gift', GiftController.getAll);
personRouter.get('/:id/gift/:giftId', GiftController.getOne);
personRouter.post('/:id/gift', GiftController.create);
personRouter.patch('/:id/gift/:giftId', GiftController.update);
personRouter.delete('/:id/gift/:giftId', GiftController.deleteOne);

module.exports = personRouter;
