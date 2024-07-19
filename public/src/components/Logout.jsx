import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const response = await axios.get(`${logoutRoute}/${id}`);
    if (response.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className=" absolute top-14  right-5 flex items-center justify-center p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
    >
      <BiPowerOff className="text-xl" />
    </button>
  );
}
