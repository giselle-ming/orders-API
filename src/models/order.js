const { Schema, model, Types } = require("mongoose");

const orderModel = new Schema(
  {
    products: [
      {
        type: Types.ObjectId,
        ref: "product", // Changed from "Product" to "product"
        required: true,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "user", // Changed from "User" to "user" to match your user model
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderModel);
