const { Schema, model, Types } = require("mongoose");

const giftModel = new Schema(
  {
    txt: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
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

module.exports = model("order", orderModel);
