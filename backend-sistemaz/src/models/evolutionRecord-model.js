const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  prontuaryNumber: {
    type: Number,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
  evolutionLink: {
    type: String,
  },
});

module.exports = mongoose.model("EvolutionRecord", schema);

/*
{
    "prontuaryNumber": 0,
    "date": "",
    "examType": "",
    "description": "",
    "examLink": ""
}
*/
