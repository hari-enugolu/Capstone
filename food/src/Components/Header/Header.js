import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NeO4RvIHyBCcvFMsVuxLuQHaFP%26pid%3DApi&f=1"
          alt="logo"
        />
      </Link>

      <Link to="/">
        <div className="header_option">
          <span className="header_optionLineOne">Home </span>
        </div>
      </Link>

      <Link to="addfood">
        <div className="header_option">
          <span className="header_optionLineOne">AddFood </span>
        </div>
      </Link>

      <Link to="requestfood">
        <div className="header_option">
          <span className="header_optionLineOne">RequestFood</span>
        </div>
      </Link>

      <Link to="donation">
        <div className="header_option">
          <span className="header_optionLineOne">Donate </span>
        </div>
      </Link>

      <Link to="orders">
        <div className="header_option">
          <span className="header_optionLineOne">Orders </span>
        </div>
      </Link>

      <Link to="signin">
        <div className="header_option">
          <span className="header_optionLineOne">Logout </span>
        </div>
      </Link>
    </div>
  );
}
