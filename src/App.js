import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateAppointment from "./pages/CreateAppoinment";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
=======
import Navigationbar from "./components/Navigationbar";
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
import Login from "./pages/Login";
import axios from "axios";
import Appointments from "./pages/Appointments";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import CreatePatient from "./pages/CreatePatient";
import Patients from "./pages/Patients";
import AppointmentDetails from "./pages/AppointmentDetails";
import PatientDetails from "./pages/PatientDetails";
import UpdatePatient from "./pages/UpdatePatient";
import UpdateAppt from "./pages/UpdateAppointment";
<<<<<<< HEAD


=======
import IsPrivate from "./components/IsPrivate";

>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
function App() {
  const [appointments, setAppointments] = useState(null);
  const [patients, setPatients] = useState(null);
  const storedToken = localStorage.getItem("authToken");
<<<<<<< HEAD

  useEffect(() => {
=======

  console.log("appointments", appointments);
  console.log("patients", patients);

  useEffect(() => {
    console.log("inside use effect");
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
    getAppointments();
    getPatients();
  }, []);

  const getAppointments = () => {
<<<<<<< HEAD
    axios.get(`${process.env.REACT_APP_API_URL}/appointments`, {
=======
    console.log("inside get apps call");
    console.log(`${process.env.REACT_APP_API_URL}/appointments`);

    axios
      .get(`${process.env.REACT_APP_API_URL}/appointments`, {
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((e) => console.log("error getting appointments from API...", e));
  };

  const getPatients = () => {
<<<<<<< HEAD
    axios.get(`${process.env.REACT_APP_API_URL}/patients`, {
=======
    axios
      .get(`${process.env.REACT_APP_API_URL}/patients`, {
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((e) => console.log("error getting patients from API...", e));
  };

<<<<<<< HEAD

=======
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
  return (
    <div className="App">
      <h1>Hospify</h1>

<<<<<<< HEAD
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/appointments"
          element={<Appointments appointments={appointments} />}
        />
        <Route
          path="/appointments/create"
          element={<CreateAppointment getAppointments={getAppointments} />}
        />
        <Route path="/patients" element={<Patients patients={patients} />} />
        <Route
          path="/patients/create"
          element={
            <CreatePatient patients={patients} getPatients={getPatients} />
=======
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
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
          }
        />
        <Route
          path="/appointments/:appointmentId"
          element={<AppointmentDetails appointments={appointments} />}
        />
        <Route
          path="/patient/:patientId"
          element={<PatientDetails patients={patients} />}
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
            <UpdateAppt
              appointments={appointments}
              updateAppointment={getAppointments}
            />
          }
        />

<<<<<<< HEAD
        <Route path="/profile" element={<UserProfile />} />
=======
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
>>>>>>> 4e516c2fe8f6e5d9b38b930b88a4238f15009c6b
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
