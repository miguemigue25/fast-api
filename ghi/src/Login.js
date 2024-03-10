// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useToken();
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`username: ${username} password: ${password}`);
//     login(username, password);
//     e.target.reset();
//     navigate("/generate");
//   };
//   return (
//     <div className="auth-container">
//       <h5 className="auth-title">Login</h5>
//       <div className="auth-form auth-form-group">
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div>
//             <label className="form-label">Username:</label>
//             <input
//               name="username"
//               type="text"
//               className="auth-form-group input"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="form-label">Password:</label>
//             <input
//               name="password"
//               type="password"
//               className="auth-form-group input"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="auth-form-group button:hover">
//             <input
//               className="auth-form-group button"
//               type="submit"
//               value="Login"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;

import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`username: ${username} password: ${password}`);

    try {
      // Attempt login
      const response = await login(username, password);
      console.log("Login Response:", response); // Log the response

      // Check if login is successful based on response
      if (response === true) {
        // Reset error if login is successful
        setError("");
        // Navigate to the "/" route
        navigate("/generate");
      } else {
        // If login failed, set error message
        setError("Incorrect username or password. Please try again.");
      }
    } catch (error) {
      // Handle any errors during login process
      console.error("Login Error:", error);
      setError("An error occurred. Please try again later.");
    }

    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <h5 className="auth-title">Login</h5>
      <div className="auth-form auth-form-group">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="auth-form-group input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="auth-form-group input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="auth-form-group button:hover">
            <input
              className="auth-form-group button"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
