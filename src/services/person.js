"use strict";

const Person = require("../models/person");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async (ownerId) => {
  const person = await Person.find({ ownerId }) //can filter here
  return person;
};

const getOne = async (id) => {
  const foundPerson = await Person.findById(id);
  if (!foundPerson) throw new NotFoundError(`Person with id ${id} not found`);
  return foundPerson;
};

const create = async (personData) => {
  console.log("Person data:", personData);
  const newPerson = new Person(personData);
  await newPerson.save();
  return newPerson;
};

const replace = async (id, personData) => {
  if (!personData.name || !personData.dob)
    throw new BadRequestError("Name and DOB are required");

  const replacedPerson = await Person.findByIdAndUpdate(
    id,
    {
      ...personData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedPerson)
    throw new NotFoundError(`Person with id ${id} not found`);

  return replacedPerson;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedPerson = await Person.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedPerson)
    throw new NotFoundError(`Person with id ${id} not found`);

  return updatedPerson;
};

const deleteOne = async (id) => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  if (!deletedPerson)
    throw new NotFoundError(`Person with id ${id} not found`);

  return deletedPerson;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
