import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function CreateAppointment (props) {

     const [date, setDate] = useState("");

     const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

     const newAppointment = {date};

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
         {console.log(date)}
        <form onSubmit={handleSubmit}>
            <label>
                Date
                <input type="date" name="date" value={date} required={true} onChange={(e) => setDate(e.target.value)} />

            </label>
            <button type="submit">Send</button>
        </form>

    </section>
    )
}

