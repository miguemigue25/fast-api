import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import logo from "./assets/logo.png";
import "./navbar.css";

const Navbar = () => {
  const { logout } = useToken();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { token } = useToken();
  const getLoggedInUserData = async () => {
    const userUrl = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(userUrl, {
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    }
  };

  useEffect(() => {
    getLoggedInUserData();
  }, [token]);

  return (
    <div className="header">
      <div className="container text-h1">
        {/* <img src={logo} alt="Logo" className="logo"></img> */}
        <Link to="/">
          <h1>
            Flashcard<span className="primary">Ai</span>
          </h1>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/">Home </Link>
          </li>
          <div>
            <Link to="/generate">Generate</Link>
          </div>
          <li>
            <a href="/flashcards">My Flashcards</a>
          </li>
        </ul>
        <div className="btn-group">
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
        <div className="btn-group">
          <Link to="/signup">
            <button className="btn">SignUp</button>
          </Link>
        </div>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={logout}>
            Logout
          </Link>
        </li>
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
