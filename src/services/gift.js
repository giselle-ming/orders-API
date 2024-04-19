"use strict";

const Order = require("../models/order");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async (personId) => {
  if (!personId) {
    throw new BadRequestError("Order ID must be provided");
  }

  const person = await Order.findById(personId);

  if (!person) {
    throw new NotFoundError(`Order with ID ${personId} not found`);
  }

  return person.gifts;
};

const getOne = async (personId, giftId) => {
  const person = await Order.findById(personId);

  if (!person) {
    throw new NotFoundError(`Order with ID ${personId} not found`);
  }

  const gift = person.gifts.id(giftId);

  if (!gift) {
    throw new NotFoundError(`Gift with ID ${giftId} not found`);
  }

  return gift;
};

const create = async (personId, giftData) => {
  if (!giftData || Object.keys(giftData).length === 0) {
    throw new BadRequestError("Gift data must be provided");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    personId,
    {
      $addToSet: {
        gifts: giftData,
      },
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedOrder) {
    throw new NotFoundError(`Order with ID ${personId} not found`);
  }

  return updatedOrder.gifts[updatedOrder.gifts.length - 1];
};

const update = async (personId, giftId, giftData) => {
  if (!giftData || Object.keys(giftData).length === 0) {
    throw new BadRequestError("Gift data must be provided");
  }

  const updateObj = {};
  Object.keys(giftData).forEach((key) => {
    updateObj[`gifts.$.${key}`] = giftData[key];
  });

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: personId, "gifts._id": giftId },
    {
      $set: updateObj,
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );

  if (!updatedOrder) {
    throw new NotFoundError(`Order or gift not found`);
  }

  return updatedOrder.gifts.find((gft) => gft._id.toString() === giftId);
};

const deleteOne = async (personId, giftId) => {
  const person = await Order.findOneAndUpdate(
    { _id: personId, "gifts._id": giftId },
    { $pull: { gifts: { _id: giftId } } }
  );

  if (!person) {
    throw new NotFoundError(`Order with ID ${personId} not found`);
  }

  const deletedGift = person.gifts.id(giftId);

  if (!deletedGift) {
    throw new NotFoundError(`Gift with ID ${giftId} not found`);
  }

  return deletedGift;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
