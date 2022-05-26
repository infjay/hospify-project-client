import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateAppointment from "./pages/CreateAppoinment";
import { Route, Routes } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Login from "./pages/Login";
import axios from "axios";
import Appointments from "./pages/Appointments";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import CreatePatient from "./pages/CreatePatient";
import Patients from "./pages/Patients";
import AppointmentDetails from "./pages/AppointmentDetails";
import UpdatePatient from "./pages/UpdatePatient";
import UpdateAppt from "./pages/UpdateAppointment";
import IsPrivate from "./components/IsPrivate";

function App() {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    console.log("inside use effect");
    getAppointments();
    getPatients();
  }, []);

  const getAppointments = () => {
    console.log("inside get apps call");
    console.log(`${process.env.REACT_APP_API_URL}/appointments`);

    axios
      .get(`${process.env.REACT_APP_API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((e) => console.log("error getting appointments from API...", e));
  };

  const getPatients = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/patients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((e) => console.log("error getting patients from API...", e));
  };

  return (
    <div className="App">
      <h1>Hospify</h1>
    
      <Navigationbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/appointments"
          element={
            <IsPrivate>
              <Appointments appointments={appointments} />
            </IsPrivate>
          }
        />
        <Route
          path="/appointments/create"
          element={
            <IsPrivate>
              <CreateAppointment getAppointments={getAppointments} />
            </IsPrivate>
          }
        />
        <Route
          path="/patients"
          element={
            <IsPrivate>
              <Patients patients={patients} />
            </IsPrivate>
          }
        />
        <Route
          path="/patients/create"
          element={
            <IsPrivate>
              <CreatePatient patients={patients} getPatients={getPatients} />
            </IsPrivate>
          }
        />
        <Route
          path="/appointments/:appointmentId"
          element={<AppointmentDetails appointments={appointments} /> }
        />
   
        <Route
          path="/patients/:patientId/edit"
          element={
            <UpdatePatient patients={patients} updatePatient={getPatients} />
          }
        />
        <Route
          path="/appointments/:appointmentId/edit"
          element={
            <IsPrivate>
            <UpdateAppt
              appointments={appointments}
              updateAppointment={getAppointments}
            />
            </IsPrivate>
          }
        />

        <Route
          path="/profile"
          element={
              <UserProfile />

          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
