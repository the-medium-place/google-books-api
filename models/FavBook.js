const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favBookSchema = new Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    authors: { type: [String], required: true },
    infoLink: { type: String, required: true },
    description: { type: String, required: true },
    imgURL: { type: String, required: true },
    bookID: { type: String, required: true, unique: true }
  });

const FavBook = mongoose.model("FavBook", favBookSchema);

module.exports = FavBook;
