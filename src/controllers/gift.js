"use strict";

const GiftService = require("../services/gift");

const getAll = async (req, res, next) => {
  const { id } = req.params;

  try {
    const gifts = await GiftService.getAll(id);

    res.json({ data: gifts });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id: orderId, giftId } = req.params;

  try {
    const gift = await GiftService.getOne(orderId, giftId);

    res.json({ data: gift });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { id: orderId } = req.params;

  try {
    const createdGift = await GiftService.create(orderId, req.sanitizedBody);

    res.json({ data: createdGift });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id: orderId, giftId } = req.params;

  try {
    const updatedGift = await GiftService.update(
      orderId,
      giftId,
      req.sanitizedBody
    );

    res.json({ data: updatedGift });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  const { id: orderId, giftId } = req.params;

  try {
    const deletedGift = await GiftService.deleteOne(orderId, giftId);
    res.json(deletedGift);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
