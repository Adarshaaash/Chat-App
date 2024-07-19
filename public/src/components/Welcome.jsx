import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(user?.username || "User");
    };
    fetchUserName();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center   text-white text-center p-6">
      <img src={Robot} alt="Robot" className="w-48 h-48 mb-6" />
      <h1 className="text-4xl font-bold mb-4">
        Welcome, <span className="text-[#61dafb]">{userName}!</span>
      </h1>
      <h3 className="text-lg font-medium">
        Please select a chat to start messaging.
      </h3>
    </div>
  );
}
