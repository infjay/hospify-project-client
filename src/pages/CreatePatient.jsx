import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePatient(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();
  const [bloodType, setBloodType] = useState();
  const [description, setDescription] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      firstName,
      lastName,
      email,
      birthDate,
      bloodType,
      description,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(process.env.REACT_APP_API_URL + "/patients", newPatient, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.getPatients();

        navigate("/patients");
      })
      .catch((e) => console.log("error creating a patient, react route", e));
  };

  return (
    <section className="CreatePatient">
      <h1>Create a new patient</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="firstName"
            value={firstName}
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name: &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="lastName"
            value={lastName}
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <br />

        <label>
          Email: &nbsp;
          <input
            type="text"
            name="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />

        <label>
          Birth Date: &nbsp;
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            required={true}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>

        <label>
          Description: &nbsp;
          <input
            type="text"
            name="description"
            value={description}
            required={true}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Blood Type: &nbsp;
          <select
            name="bloodType"
            required={true}
            onChange={(e) => setBloodType(e.target.value)}
          >
            <option value={bloodType}>0+</option>
            <option value={bloodType}>0-</option>
            <option value={bloodType}>A+</option>
            <option value={bloodType}>A-</option>
            <option value={bloodType}>B-</option>
            <option value={bloodType}>B+</option>
            <option value={bloodType}>AB+</option>
            <option value={bloodType}>AB-</option>
          </select>
        </label>
        <br />
        <br />

        <button type="submit">Create Patient</button>
      </form>
    </section>
  );
}

export default CreatePatient;
