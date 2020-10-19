import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/authentication/logout";

function Header() {
  return (
    <div className="heading">
      <Link to="/">
        <h1 className="headingText">
          <img
            className="imageLogo"
            src="https://img.icons8.com/doodle/48/000000/map-marker.png"
            alt="."
          />
          blogApp
        </h1>
      </Link>

      <Link to="/logout">
        <Logout />
      </Link>
    </div>
  );
}

export default Header;
