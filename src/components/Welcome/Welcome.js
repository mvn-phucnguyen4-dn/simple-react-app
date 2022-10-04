import React, { useState, useEffect } from "react";
import Robot from "../../assets/robot.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(
      JSON.parse(
        localStorage.getItem("user")
      ).username
    );
  }, []);
  return (
    <div className="container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

export default Welcome;
