const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    size: String,
    price: Number,
  },
  { _id: false }
); // This is important to prevent Mongoose from creating an ObjectId for this subdocument

const orderModel = new Schema(
  {
    products: [productSchema], // Use the productSchema for products
    date: {
      type: Date,
      default: Date.now,
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

module.exports = model("Order", orderModel);
