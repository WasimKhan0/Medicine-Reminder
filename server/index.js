const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Reminder = require("./models/reminderModel");
// const wbm = require("wbm");

const authRouter = require("./Routes/userRoute");
const reminderRouter = require("./Routes/reminderRouter");
const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/rem", reminderRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/Medicine-Data")
  .then(() => console.log("connnected to DB"))
  .catch((err) => console.log(err));

setInterval(async () => {
  const res = await Reminder.find({});
  // const user = await User.findOne({isLogin:true});
  // console.log(user);
  if (res) {
    res.forEach((reminder) => {
      if (!reminder.isReminded) {
        const now = new Date();
         if (new Date(reminder.time) - now < 0) {
          (async () => {
            const up = await Reminder.findByIdAndUpdate(reminder._id, {
              isReminded: true,
            });
          })();
          const accountSid = process.env.ACCOUNT_SID;
          const authToken = process.env.AUTH_TOKEN;

          const client = require("twilio")(accountSid, authToken);
          client.messages
            .create({
              body: `Hello ${reminder.reminderMaker}!! It's time for medicines... Medicine name: ${reminder.medicineName} , dosage: ${reminder.dosage}`,
              from: "+14154032677",
              to: `+91${reminder.userNumber}`,
            })
            .then((message) => console.log(message.sid));
          client.messages
            .create({
              body: `Hello ${reminder.reminderMaker}!! It's time for medicines... Medicine name: ${reminder.medicineName} , dosage: ${reminder.dosage}`,
              from: "+14154032677",
              to: `+91${reminder.caretakerNumber}`,
            })
            .then((message) => console.log(message.sid));
          // })
        }
      }
    });
  }
}, 10000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
