import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function CreateAppointment (props) {

     const [date, setDate] = useState("");
     const [time, setTime] = useState("");
     const [patient, setPatient] = useState("");
     const [doctor, setDoctor] = useState("")

     const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

     const newAppointment = {date, time , patient, doctor};

     const storedToken = localStorage.getItem('authToken');


    axios.post(process.env.REACT_APP_API_URL + "/appointments",
     newAppointment,
     { headers: { Authorization: `Bearer ${storedToken}`} }
     )
        .then( response => {
            props.callbackNewApp();

            navigate("/appointments")
        })
        .catch( e => console.log("error creating an appointment, react route", e));
     }

    return(

    <section className="CreateAppointment">
    
    <h1>Create a new appointment</h1>
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
                <input type='text' name='patient' value={patient} required={true} onChange={(e) => setPatient(e.target.value)} />
            </label>
            <br /><br />

            <label>
            Doctor Id: &nbsp;
                <input type='text' name='doctor' value={doctor} required={true} onChange={(e) => setDoctor(e.target.value)} />
            </label>
            <br /><br />


            <button type="submit">Send</button>
        </form>

    </section>
    )
}

