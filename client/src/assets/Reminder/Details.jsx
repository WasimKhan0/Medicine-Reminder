import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";
const Details = (props) => {
  const { fun } = props;
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [caretakerName, setCaretakerName] = useState("");
  const [caretakerNumber, setCaretakerNumber] = useState("");
  const [currentUser, setcurrentUser] = useState("");

  
  const addRemider = async () => {
    const userId = await JSON.parse(localStorage.getItem("user"));
    const userData = await axios.get(
      `http://localhost:8000/api/auth/${userId}`
    );

    const userNumber = userData.data.mobile;
    const reminderMaker = userData.data.username;

     const res = await axios.post("http://localhost:8000/api/rem/addReminder", {
      medicineName,
      reminderMaker,
      time,
      dosage,
      caretakerName,
      caretakerNumber,
      userNumber,
      userId,
    });
    fun();
    setCaretakerName("");
    setDosage("");
    setMedicineName("");
    setTime("");
    setCaretakerNumber("");
  };

  useEffect(() => {
    const Myfun = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setcurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    Myfun();
  }, []);
  return (
    <div className="w-4/6 h-[450px] font-sans justify-around p-5">
      <form className="h-[500px] flex flex-col font-[500] justify-around ml-[50px]">
        <div className="flex gap-3">
          <label for="medicineName">Medicine Name :</label>
          <input
            className="border-b-2 w-[300px]"
            type="text"
            id="medicineName"
            name="medicineName"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <label for="dosage">Dosage :</label>
          <input
            className="border-b-2 w-[300px]"
            type="text"
            id="dosage"
            name="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <label for="time">Time :</label>

          <DatePicker
            className="border-b-2"
            selected={time}
            onChange={setTime}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="dd-MM-yyyy HH:mm"
            minDate={new Date()}
          />
        </div>
        <div className="flex gap-3">
          <label for="caretaker">Caretaker :</label>
          <input
            className="border-b-2 w-[300px]"
            type="text"
            id="caretaker"
            value={caretakerName}
            onChange={(e) => setCaretakerName(e.target.value)}
            name="caretaker"
          />
        </div>

        <div className="flex gap-3">
          <label for="caretaker">Caretaker number :</label>
          <input
            className="border-b-2 w-[300px]"
            type="text"
            id="caretaker"
            value={caretakerNumber}
            onChange={(e) => setCaretakerNumber(e.target.value)}
            name="caretaker"
          />
        </div>

        <button
          className="w-[140px] h-[45px] rounded-md bg-[#000] flex justify-center items-center cursor-pointer text-[#ffffff] "
          onClick={addRemider}
          type="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Details;
