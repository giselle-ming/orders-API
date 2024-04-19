const ProductService = require("../services/product");

const getAll = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    const product = await ProductService.getAll(ownerId);
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const product = await ProductService.getOne(req.params.id);
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, price } = req.sanitizedBody;
    const { _id: ownerId } = req.user;
    const createdProduct = await ProductService.create({
      name,
      price,
      ownerId,
    });
    res.status(201).json({ data: createdProduct });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const replacedProduct = await ProductService.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json({ data: replacedProduct });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedProduct = await ProductService.update(
      req.params.id,
      req.sanitizedBody
    );

    res.json({ data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedProduct = await ProductService.deleteOne(req.params.id);
    res.json({ data: deletedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
