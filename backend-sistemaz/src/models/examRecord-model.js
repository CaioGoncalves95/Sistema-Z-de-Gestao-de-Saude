const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  prontuaryNumber: {
    type: Number,
  },
  date: {
    type: Date,
  },
  examType: {
    type: String,
  },
  description: {
    type: String,
  },
  examLink: {
    type: String,
  },
});

module.exports = mongoose.model("ExamRecord", schema);

/*
{
    "prontuaryNumber": 0,
    "date": "",
    "examType": "",
    "description": "",
    "examLink": ""
}
*/
