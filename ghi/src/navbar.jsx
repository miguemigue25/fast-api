import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./navbar.css";
function Nav() {
  const { token, logout } = useToken();
  const isAuthenticated = !!token;
  return (
    <div className="header">
      <nav className="nav-menu">
        <div className="container">
          <NavLink to="/">
            <div>
              <h1 className="">
                Flashcard<span className="primary">Ai</span>
              </h1>
            </div>
          </NavLink>
          <NavLink to="/"></NavLink>
          <div className="nav-menu" id="navbarNav">
            <ul>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-info" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item link-spacing">
                    <NavLink className="nav-link text-success" to="/generate">
                      Generate
                    </NavLink>
                  </li>
                  {/* <li className="nav-item link-spacing">
                    <NavLink className="nav-link text-primary" to="/profile">
                      Profile
                    </NavLink>
                  </li> */}
                  <li className="nav-item link-spacing">
                    <NavLink className="nav-link text-danger" to="/flashcards">
                      My Flashcards
                    </NavLink>
                  </li>
                  {/* <li className="nav-item link-spacing">
                    <NavLink className="nav-link text-warning" to="/update">
                      Update Account
                    </NavLink>
                  </li> */}
                  <li className="nav-item link-spacing">
                    <NavLink className="nav-link" to="/" onClick={logout}>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <NavLink className="nav-link text-warning" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item link-spacing">
                    <NavLink className="nav-link text-info" to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Nav;

// import React, { useState, useEffect } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// // import logo from "./assets/logo.png";
// import "./navbar.css";

// const Navbar = () => {
//   const { logout } = useToken();
//   const [click, setClick] = useState(false);
//   const handleClick = () => setClick(!click);
//   const { token } = useToken();
//   const getLoggedInUserData = async () => {
//     const userUrl = `${process.env.REACT_APP_API_HOST}/token`;
//     const response = await fetch(userUrl, {
//       credentials: "include",
//     });
//     if (response.ok) {
//       console.log(response);
//     }
//   };

//   useEffect(() => {
//     getLoggedInUserData();
//   }, [token]);

//   return (
//     <div className="header">
//       <div className="container text-h1">
//         {/* <img src={logo} alt="Logo" className="logo"></img> */}
//         <Link to="/">
//           <h1>
//             Flashcard<span className="primary">Ai</span>
//           </h1>
//         </Link>
//         <ul className={click ? "nav-menu active" : "nav-menu"}>
//           <li>
//             <Link to="/">Home </Link>
//           </li>
//           <div>
//             <Link to="/generate">Generate</Link>
//           </div>
//           <li>
//             <a href="/flashcards">My Flashcards</a>
//           </li>
//         </ul>
//         <div className="btn-group">
//           <Link to="/login">
//             <button className="btn">Login</button>
//           </Link>
//         </div>
//         <div className="btn-group">
//           <Link to="/signup">
//             <button className="btn">SignUp</button>
//           </Link>
//         </div>
//         <li className="nav-item">
//           <Link className="nav-link" to="/login" onClick={logout}>
//             Logout
//           </Link>
//         </li>
//         <div className="hamburger" onClick={handleClick}>
//           {click ? (
//             <FaTimes size={20} style={{ color: "#333" }} />
//           ) : (
//             <FaBars size={20} style={{ color: "#333" }} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
