"use strict";

const Order = require("../models/order");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async (ownerId) => {
  const order = await Order.find({ ownerId });
  return order;
};

const getOne = async (id) => {
  const foundOrder = await Order.findById(id);
  if (!foundOrder) throw new NotFoundError(`Order with id ${id} not found`);
  return foundOrder;
};

const create = async (orderData) => {
  if (
    !orderData.products ||
    !orderData.ownerId ||
    typeof orderData.total !== "number"
  ) {
    throw new BadRequestError("Products, total and ownerId are required");
  }

  // Validate each product in orderData.products
  orderData.products.forEach((product) => {
    if (!product.name || !product.size || typeof product.price !== "number") {
      throw new BadRequestError(
        "Each product must have a name, size, and price"
      );
    }
  });

  const newOrder = new Order(orderData);
  await newOrder.save();
  return newOrder;
};

const replace = async (id, orderData) => {
  if (
    !orderData.products ||
    !orderData.ownerId ||
    typeof orderData.total !== "number"
  ) {
    throw new BadRequestError("Products, total and ownerId are required");
  }

  // Validate each product in orderData.products
  orderData.products.forEach((product) => {
    if (!product.name || !product.size || typeof product.price !== "number") {
      throw new BadRequestError(
        "Each product must have a name, size, and price"
      );
    }
  });

  const replacedOrder = await Order.findByIdAndUpdate(
    id,
    {
      ...orderData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedOrder) throw new NotFoundError(`Order with id ${id} not found`);

  return replacedOrder;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedOrder) throw new NotFoundError(`Order with id ${id} not found`);

  return updatedOrder;
};

const deleteOne = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) throw new NotFoundError(`Order with id ${id} not found`);

  return deletedOrder;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
