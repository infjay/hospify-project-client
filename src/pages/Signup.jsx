import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = { email, password, specialty, firstName, lastName };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error creating account", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Signup">
      <br />
      <h1>Register</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            required={true}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="last Name"
            name="lastName"
            required={true}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Specialty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Specialty"
            name="specialty"
            required={true}
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </form>
      <br />
      <p>
        Already have account?
        <Link to={"/login"}> Login</Link>
      </p>
    </div>
  );
}

export default Signup;
