"use strict";

const Product = require("../models/product");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async (ownerId) => {
  const product = await Product.find({ ownerId });
  return product;
};

const getOne = async (id) => {
  const foundProduct = await Product.findById(id);
  if (!foundProduct) throw new NotFoundError(`Product with id ${id} not found`);
  return foundProduct;
};

const create = async (productData) => {
  if (!productData.name || !productData.price || !productData.ownerId) {
    throw new BadRequestError("Name, price, and ownerId are required");
  }

  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};

const replace = async (id, productData) => {
  if (!productData.name || !productData.price || !productData.ownerId) {
    throw new BadRequestError("Name, price, and ownerId are required");
  }

  const replacedProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...productData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedProduct)
    throw new NotFoundError(`Product with id ${id} not found`);

  return replacedProduct;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedProduct)
    throw new NotFoundError(`Product with id ${id} not found`);

  return updatedProduct;
};

const deleteOne = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct)
    throw new NotFoundError(`Product with id ${id} not found`);

  return deletedProduct;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
