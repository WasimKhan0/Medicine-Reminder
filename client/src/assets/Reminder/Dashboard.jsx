import React from "react";
import Details from "./Details";
import axios from "axios";
import gif from "../../img/robot.gif";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const Dashboard = () => {
  const [list, setList] = useState([]);

  const getMeList = async () => {
    const userId = await JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(
      `http://localhost:8000/api/rem/getReminder/${userId}`
    );
    setList(res.data);
  };
  useEffect(() => {
    getMeList();
  }, []);
  const deleteReminder = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/rem/deleteReminder/${id}`
    );
    setList(res.data);
  };
   
  return (
    <>
      <Header />
      <div className="flex w-full font-sans h-[460px]">
        <Details fun={getMeList} />

        {/* <List/> */}
        <div className="w-1/3 h-[460px] overflow-auto flex flex-col items-center gap-2 p-3 font-sans z-3 mt-3">
          {list.length !== 0 ? (
            list.map((li) => {
              return (
                <>
                  <div
                    className="w-[400px] flex flex-col p-6 gap-2 font-[700] rounded-[10px] box bg-[#ffffff]"
                    key={li._id}
                  >
                    <div className="flex justify-between h-[19px]">
                      <h1>Medicine name: {li?.medicineName}</h1>
                      <button
                        className="w-[30px] h-[30px] font-[500] bg-[#f74242] flex justify-center rounded-full items-center cursor-pointer text-[#ffffff] header"
                        onClick={() => deleteReminder(li._id)}
                        type="button"
                      >
                        X
                      </button>
                    </div>

                    <h1>Dosage: {li?.dosage}</h1>
 
                    <h1>Time: {(new Date(li?.time)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</h1>
                    <h1>caretaker: {li?.caretakerName}</h1>
                    <h1 className="flex gap-2">
                      Status:
                      {li?.isReminded ? (
                        <>
                          <h1>Successfully reminded ✔</h1>
                        </>
                      ) : (
                        <>
                          <h1>Pending ⏳</h1>
                        </>
                      )}
                    </h1>
                  </div>
                </>
              );
            })
          ) : (
            <div className="flex items-center flex-col p-6">
              <h1 className="w-[200px] font-[500] text-[25px]">
                No Reminders !
              </h1>
              <div>
                <img src={gif}></img>
              </div>
            </div>
          )}
          <div className=""></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
