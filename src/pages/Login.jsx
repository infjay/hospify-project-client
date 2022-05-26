import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Button } from "react-bootstrap";
=======
import { Form, Button } from "react-bootstrap";

>>>>>>> ec8b594ae4fa6c4cc554570134c0999b7cb30cb9
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

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
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
      <br />
      <h1>Login</h1>
      <br />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
      <br />
      <p>
        Don't have an account yet?
        <Link to={"/signup"}> Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
