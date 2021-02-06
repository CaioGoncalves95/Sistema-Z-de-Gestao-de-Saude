const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
  },
  area: {
    type: String,
  },
  comments: {
    type: String,
  },
  units: [String],
});

module.exports = mongoose.model("ExamType", schema);

/*
{
    "name": "",
    "area": "",
    "comments": "",
    "units": [{
      "name": ""
    }]
}
*/
