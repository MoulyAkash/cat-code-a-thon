import React from "react";
import { BiBell } from "react-icons/bi";
import "./header.css";
import ProfileImage from "../../assets/profile.png";

export default function Header() {
  return (
    <div className="header-container">
      <div className="left">
        <div className="user-info">
          <img src={ProfileImage} />
          <div className="info">
            <h1>Good day, John</h1>
            <p>Driving License ID: 453654669</p>
          </div>
        </div>
      </div>
      <div className="right">
        <p>{new Date().toDateString()}</p>
        <div className="notification-icon">
          <BiBell />
        </div>
      </div>
    </div>
  );
}
