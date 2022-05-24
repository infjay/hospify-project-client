import { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"


function UpdateAppt (props) {

    const { appointmentId } = useParams()

    const [ details , setDetails] = useState(null)

    useEffect( () => {
        getDetails();
    }, []);


    const getDetails = () => {

        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`,
        {headers: {Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log("appointment details", response.data)
                setDetails(response.data);
              })
            .catch( err => console.log("error getting details ", err))
    }

    const navigate = useNavigate();

    const appointmentDetails = props.appointments?.find( appointment => appointment._id === appointmentId);


    const [date, setDate] = useState(appointmentDetails?.date);
    const [time, setTime] = useState(appointmentDetails?.time);
    const [patient, setPatient] = useState(appointmentDetails?.patient);
    const [doctor, setDoctor] = useState(appointmentDetails?.doctor)


   const handleSubmit = (e) => {
   e.preventDefault();

    const updateAppointment = {date, time , patient, doctor};

    const storedToken = localStorage.getItem('authToken');


   axios.put(`${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`,
   updateAppointment,
    { headers: { Authorization: `Bearer ${storedToken}`} }
    )
       .then( response => {
           props.callbackUpdateApp();

           navigate("/appointments")
       })
       .catch( e => console.log("error creating an appointment, react route", e));
    }

    return(
        <section>
        <h1>Update appointment</h1>

        
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
                Patient id: &nbsp;
                <input type='text' name='patient' value={patient} required={true} placeholder={details?.patient?._id} onChange={(e) => setPatient(e.target.value)} />
            </label>
            <br /><br />

            <label>
            Doctor Id: &nbsp;
                <input type='text' name='doctor' value={doctor} required={true} placeholder={details?.doctor?._id} onChange={(e) => setDoctor(e.target.value)} />
            </label>
            <br /><br />


            <button type="submit">Update</button>
        </form>

        
        </section>
    )
}

export default UpdateAppt;