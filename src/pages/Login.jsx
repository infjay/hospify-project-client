import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // login successful
        const jwt = response.data.authToken;

        storeToken(jwt); 
        authenticateUser();

        navigate("/profile");
      })
      .catch((error) => {
        // login failed
        const errorDescription = error.response.data.message;
        console.log("error loggin in...", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

&nbsp;<label>Password:</label>&nbsp;&nbsp;
        <input
          type="password"
          name="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

       &nbsp; <Button type="submit">Login</Button>
      </form>

      <p>Don't have an account yet?</p>
      <Button href={"/signup"}> Sign Up</Button>
    </div>
  );
}

export default Login;
