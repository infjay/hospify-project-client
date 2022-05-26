import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

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

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody,
      {headers: {Authorization: `Bearer ${storedToken}` } })
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
      <h1>Register</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />&nbsp;

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />&nbsp;
        <label>First Name: </label>
        <input
          type="String"
          name="firstName"
          value={firstName}
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        /> &nbsp;
        <label>Last Name: </label>
        <input
          type="String"
          name="lastName"
          value={lastName}
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        />&nbsp; <br />
        <label>Specialty:</label>
        <input
          type="String"
          name="Specialty"
          value={specialty}
          required={true}
          onChange={(e) => setSpecialty(e.target.value)}
        />

    &nbsp;    <Button type="submit">Sign Up</Button>
      </form>

      <p>Already have account?</p>
      <Button href={"/login"}> Login</Button>
    </div>
  );
}

export default Signup;
