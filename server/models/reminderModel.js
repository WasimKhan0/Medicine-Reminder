const mongoose = require("mongoose");

const ReminderSchema = mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  reminderMaker: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  caretakerName: {
    type: String,
    required: true,
  },
  caretakerNumber: {
    type: Number,
    required: true,
  },

  isReminded: {
    type: Boolean,
    default: false,
  },
  userNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
const Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;
