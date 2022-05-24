import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateAppointment from './pages/CreateAppoinmentPage';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import AppointmentPage from './pages/AppointmentPage';
import { useEffect, useState } from "react";
import SignupPage from './pages/SignupPage'
import UserProfile from './pages/UserProfile'
import CreatePatient from './pages/CreatePatients';
import Patients from './pages/Patients';
import AppDetails from './pages/AppointmentDetails';
import PatientDetails from './pages/PatientDetails';
import UpdatePatient from './pages/UpdatePatient';
import UpdateAppt from './pages/UpdateAppointment';

function App() {

const [ appointments, setAppointments ] = useState(null);
const [ patients, setPatients ] = useState(null);

  useEffect(() => {
    getAppointments();
    getPatients();
  }, []);


  const getAppointments = () => {

    const storedToken = localStorage.getItem('authToken');

    axios.get(`${process.env.REACT_APP_API_URL}/appointments`,
    {headers: {Authorization: `Bearer ${storedToken}` } })
      .then( response => {
        console.log("appointments", response.data)
        setAppointments(response.data);
      })
      .catch( e=> console.log('error getting appointments from API...', e))
  }

  const getPatients = () => {

  const storedToken = localStorage.getItem('authToken');

    axios.get(`${process.env.REACT_APP_API_URL}/patients`,
    {headers: {Authorization: `Bearer ${storedToken}` } })
      .then( response => {
        console.log("patients", response.data)
        setPatients(response.data)
      })
      .catch( e => console.log('error getting patients from API...', e))
  }



  return (
    <div className="App">
      <h1>Hospify</h1>

      <Navbar/>

      <Routes>
        <Route path='/' element={LoginPage} />
        <Route path='/appointments'  element={<AppointmentPage appointments={appointments}/>}/>
        <Route path='/appointments/create' element={<CreateAppointment callbackNewApp={getAppointments} />} />
        <Route path='/patients' element={<Patients patients={patients} />}/>
        <Route path='/patients/create' element={<CreatePatient callbackCreatePat={getPatients} />}/>
        <Route path='/appointments/:appointmentId' element={<AppDetails callbackDetails={appointments} />}/>
        <Route path='/patient/:patientId' element={ <PatientDetails callbackPatDetails={patients} />} />
        <Route path='/patients/:patientId/edit' element={ <UpdatePatient callbackUpdatePat={getPatients} />} /> 
        <Route path='/appointments/:appointmentId/edit' element={<UpdateAppt callbackUpdateApp={getAppointments}/> } />

        <Route path='/profile' element={<UserProfile />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </div>

  );
}

export default App;
