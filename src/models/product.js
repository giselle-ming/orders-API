const { Schema, model, Types } = require("mongoose");

const productModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("product", productModel);
