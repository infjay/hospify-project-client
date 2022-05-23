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
import PatientList from './pages/Patients';
import CreatePatient from './pages/CreatePatients';

function App() {

const [ appointments, setAppointments ] = useState(null);
const [ patients, setPatients ] = useState(null);

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    getPatients();
  }, []);


  const getAppointments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/appointments`)
      .then( response => {
        setAppointments(response.data);
      })
      .catch( e=> console.log('error getting appointments from API...', e))
  }

  const getPatients = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/patients`)
      .then( response => {
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
        <Route path='/patients' element={<PatientList patients={patients} />}/>
        <Route path='/patients/create' element={<CreatePatient callbackCreatePat={getPatients} />}/>

        <Route path='/profile' element={<UserProfile />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </div>

  );
}

export default App;
