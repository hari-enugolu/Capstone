import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <img
        className="header_logo"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NeO4RvIHyBCcvFMsVuxLuQHaFP%26pid%3DApi&f=1"
        alt="logo"
      />

      <div className="header_option">
        <span className="header_optionLineOne">Home </span>
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">AddFood </span>
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">RequestFood</span>
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">Donate </span>
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">Orders </span>
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">Logout </span>
      </div>
    </div>
  );
}
