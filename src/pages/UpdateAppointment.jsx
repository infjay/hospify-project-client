import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateAppointment(props) {
  const storedToken = localStorage.getItem('authToken');
  const { appointmentId } = useParams();

  const [details, setDetails] = useState(null);
  const [allDoctors , setAllDoctors] = useState([])
  const [allPatients, setAllPatients] = useState([])

  useEffect( () => { 
     axios.get(`${process.env.REACT_APP_API_URL}/login`,
     {headers: {Authorization: `Bearer ${storedToken}` } })
         .then( result => setAllDoctors(result.data.allDocs))
         
         .catch(err => console.log('there is an error', err))
     },[])

   useEffect( () => {
       axios.get(`${process.env.REACT_APP_API_URL}/patients`,
       {headers: {Authorization: `Bearer ${storedToken}` } })
       .then( result => setAllPatients(result.data))

       .catch(err => console.log('there is an error', err))
     },[])
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    const storedToken = localStorage.getItem("authToken");

    axios.get(`${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("appointment details", response.data);
        setDetails(response.data);
      })
      .catch((err) => console.log("error getting details ", err));
  };

  const navigate = useNavigate();

  const appointmentDetails = props.appointments?.find(
    (appointment) => appointment._id === appointmentId
  );

  const [date, setDate] = useState(appointmentDetails?.date);
  const [time, setTime] = useState(appointmentDetails?.time);
  const [patient, setPatient] = useState(appointmentDetails?.patient);
  const [doctor, setDoctor] = useState(appointmentDetails?.doctor);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateAppointment = { date, time, patient, doctor };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`,
        updateAppointment,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        props.getAppointments();

        navigate("/appointments");
      })
      .catch((e) =>
        console.log("error creating an appointment, react route", e)
      );
  };

  const docOptions = allDoctors.map( eachDoctor => {
    return ( 
        <option value={eachDoctor._id} >{eachDoctor.firstName} {eachDoctor.lastName}</option>
    )
})


const patientList = allPatients.map( eachPatient => {
    return (
         <option value={eachPatient._id} > {eachPatient.firstName} {eachPatient.lastName}</option>
    )
})


  return (
    <section>
      <h1>Update appointment</h1>


      <section className="CreateAppointment">
    
        <form onSubmit={handleSubmit}>
            <label>
                Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" name="date" value={date} required={true} onChange={(e) => setDate(e.target.value)} />

            </label>
            <label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="time" name="time" value={time} required={true} onChange={(e) => setTime(e.target.value)} />

            </label>
            <br /><br />

            <label>
                patient id: &nbsp;
                <select type='text' name='patient' value={patient} required={true} onChange={(e) => setPatient(e.target.value)} >
                    {patientList}
                </select>    
            </label>
            <br /><br />

            <label>
            Doctor: &nbsp;
                <select type='text' name='doctor' value={doctor} required={true} onChange={(e) => setDoctor(e.target.value)} >
                    {docOptions}
                </select>
            </label>
            <br /><br />


            <button type="submit">Send</button>
        </form>

    </section>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="date"
            name="date"
            value={date}
            required={true}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="time"
            name="time"
            value={time}
            required={true}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <br />

        <label>
          Patient id: &nbsp;
          <input
            type="text"
            name="patient"
            value={patient}
            required={true}
            placeholder={details?.patient?.lastName}
            onChange={(e) => setPatient(e.target.value)}
          />
        </label>
        <br />
        <br />

        <label>
          Doctor Id: &nbsp;
          <input
            type="text"
            name="doctor"
            value={doctor}
            required={true}
            placeholder={details?.doctor?.lastName}
            onChange={(e) => setDoctor(e.target.value)}
          />
        </label>
        <br />
        <br />

        <button type="submit">Update</button>
      </form> */}
    </section>
  );
}

export default UpdateAppointment;
