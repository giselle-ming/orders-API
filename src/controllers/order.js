const OrderService = require("../services/order");

const getAll = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    const order = await OrderService.getAll(ownerId);
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const order = await OrderService.getOne(req.params.id);
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, dob } = req.sanitizedBody;
    const { _id: ownerId } = req.user;
    const createdOrder = await OrderService.create({
      name,
      dob,
      ownerId,
    });
    res.status(201).json({ data: createdOrder });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const replacedOrder = await OrderService.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json({ data: replacedOrder });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedOrder = await OrderService.update(
      req.params.id,
      req.sanitizedBody
    );

    res.json({ data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedOrder = await OrderService.deleteOne(req.params.id);
    res.json({ data: deletedOrder });
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
