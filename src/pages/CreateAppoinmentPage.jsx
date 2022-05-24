import { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export default function CreateAppointment (props) {
    const storedToken = localStorage.getItem('authToken');

     const [date, setDate] = useState("");
     const [time, setTime] = useState("");
     const [patient, setPatient] = useState("");
     const [doctor, setDoctor] = useState("")
     const [allDoctors , setAllDoctors] = useState([])

     const { appointmentId } = useParams()

     useEffect( () => { 
        axios.get(`${process.env.REACT_APP_API_URL}/login`,
        {headers: {Authorization: `Bearer ${storedToken}` } })
            .then( result => setAllDoctors(result.data.allDocs))
            .catch(err => console.log('there is an error', err))
        },[])

        console.log(allDoctors)
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

     const docOptions = allDoctors.map( eachDoctor => {
         return ( 
             <option value={eachDoctor._id} >{eachDoctor.firstName} {eachDoctor.lastName}</option>
         )
     })
     

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
                <select type='text' name='doctor' value={doctor} required={true} onChange={(e) => setDoctor(e.target.value)} >
                    {docOptions}
                </select>
            </label>
            <br /><br />


            <button type="submit">Send</button>
        </form>

    </section>
    )
}

