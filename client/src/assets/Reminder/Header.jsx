import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
const Header = () => {
  const [name,setName] = useState();
  const Navigate = useNavigate();
  const getCurrentUser = async () => {
     
    const userId = await JSON.parse(localStorage.getItem("user"));
     const res = await axios.get(
      `http://localhost:8000/api/auth/${userId}`
    );
       setName(res.data.username);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
      localStorage.clear();
    Navigate("/login");
  };

  return (
    <div className="flex w-full h-[80px] justify-between p-6 font-sans header z-10">
      <div className="cursor-pointer">
        <h1 className="text-3xl font-bold italic">myREMINDER.</h1>
      </div>
      <div className="flex w-[140px] justify-between">
        
        <h2 className=" font-[500]">{name}</h2>
        <h2 className="cursor-pointer font-[500]" onClick={handleLogout}>
          Logout
        </h2>
      </div>
    </div>
  );
};

export default Header;
