const PersonService = require("../services/person");

const getAll = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    const person = await PersonService.getAll(ownerId);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const person = await PersonService.getOne(req.params.id);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, dob } = req.sanitizedBody;
    const { _id: ownerId } = req.user;
    const createdPerson = await PersonService.create({
      name,
      dob,
      ownerId,
    });
    res.status(201).json({ data: createdPerson });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const replacedPerson = await PersonService.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json({ data: replacedPerson });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedPerson = await PersonService.update(
      req.params.id,
      req.sanitizedBody
    );

    res.json({ data: updatedPerson });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedPerson = await PersonService.deleteOne(req.params.id);
    res.json({ data: deletedPerson });
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
