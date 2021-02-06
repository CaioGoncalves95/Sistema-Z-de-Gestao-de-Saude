const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  day: {
    type: Number,
  },
  schedule: [
    {
      startTime: Date,
      endTime: Date,
      booked: Boolean,
      bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Schedule", schema);

/*
{
    "day": 1,
    "schedule": [{
        "startTime": "",
        "endTime": "",
        "booked": false,
        "bookedBy": "id",
    }]
}
*/
