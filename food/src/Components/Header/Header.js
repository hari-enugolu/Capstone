import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img
          className="header_logo"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.K-9LIOh69IGrxFAcpxWGowHaEd%26pid%3DApi&f=1"
          alt="logo"
        />
      </Link>

      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">Home </span>
        </div>
      </Link>

      <Link to="addfood" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">AddFood </span>
        </div>
      </Link>

      <Link to="requestfood" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">RequestFood</span>
        </div>
      </Link>

      <Link to="donation" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">Donate </span>
        </div>
      </Link>

      <Link to="orders" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">Orders </span>
        </div>
      </Link>

      <Link to="signin" style={{ textDecoration: "none" }}>
        <div className="header_option">
          <span className="header_optionLineOne">Logout </span>
        </div>
      </Link>
    </div>
  );
}
