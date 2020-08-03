const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number, // Valor inicial em U$ investido.
      required: true,
    },
    amount: {
      type: Number, // Quantidade de ações ou criptomoedas investidas.
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
