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
    }
  },
  {
    timestamps: true,
  }
);

const personModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gifts: [giftModel],
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

module.exports = model("person", personModel);
