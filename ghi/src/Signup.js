import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
    };
    const registrationResponse = await register(
      accountData,
      `${process.env.REACT_APP_API_HOST}/users`
    );
    console.log(registrationResponse);
    e.target.reset();
    navigate("/");
  };
  return (
    <div className="auth-container">
      <h5 className="auth-title">Signup</h5>
      <div className="auth-form-group label">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="auth-form-group">
            <label className="">username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="auth-form-group label">
            <label className="">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="auth-form-group button"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
