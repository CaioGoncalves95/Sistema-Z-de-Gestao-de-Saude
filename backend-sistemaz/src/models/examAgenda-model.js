const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  monthReference: {
    type: Number,
  },
  unit: {
    type: String,
  },
  examType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExamType",
  },
  schedule: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
  ],
});

module.exports = mongoose.model("ExamAgenda", schema);

/*
{
    "monthReference": 0,
    "unit": "Unidade São Mateus",
    "examType": "",
    "schedule": ["",""]
}
*/
