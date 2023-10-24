const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminderModel");
//Routes

router.get("/getAllReminder", async (req, res) => {
  try {
    const reminders = await Reminder.find({});
    if (!reminders) {
      return res.status(404).json("no reminder found");
    }
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/addReminder", async (req, res) => {
  try {
    const { medicineName, reminderMaker,time, dosage, caretakerName,caretakerNumber,userNumber,userId } = req.body;
    const reminder = new Reminder({
      medicineName,
      reminderMaker,
      time,
      dosage,
      caretakerName,
      caretakerNumber,
      isReminded:false,
      userNumber,
      userId
    });
    const data = await reminder.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});
router.delete("/deleteReminder/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteReminder = await Reminder.findByIdAndDelete(userId);
    if (!deleteReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    const reminders = await Reminder.find({});

    res.json(reminders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/getReminder/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const reminders = await Reminder.find({userId});
    if (!reminders) {
      return res.status(404).json("no reminder found");
    }
    return res.status(200).json(reminders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
