const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  value: {
    type: Number,
  },
});

module.exports = mongoose.model("ProntuarySequence", schema);
