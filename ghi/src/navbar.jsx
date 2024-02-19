import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="header">
      <div className="container text-h1">
        <Link to="/">
          <h1>
            Flashcard<span className="primary">Ai</span>
          </h1>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/">Home </Link>
          </li>

          <Link>
            <a href="/login">Generate</a>
          </Link>
          <li>
            <a href="/flashcards">My Flashcards</a>
          </li>
        </ul>
        <div className="btn-group">
          <Link to="/login">
            <button className="btn">SignUp/Login</button>
          </Link>
        </div>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "#333" }} />
          ) : (
            <FaBars size={20} style={{ color: "#333" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
