import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`username: ${username} password: ${password}`);
    login(username, password);
    e.target.reset();
    navigate("/generate");
  };
  return (
    <div className="auth-container">
      <h5 className="auth-title">Login</h5>
      <div className="auth-form auth-form-group">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="auth-form-group input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="auth-form-group input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
