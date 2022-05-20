import { useState, useParams, useNavigate } from "react"
import axios from "axios"


function CreateAppointment () {

    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {date};

    axios.post(process.env.REACT_APP_API_URL + "/appointments/create", newAppointment)
        .then( response => {
            
        })
        .catch( e => console.log("error creating an appointment, react route", e));
    }

    return(

    <>
    
    </>
    )
}

export default CreateAppointment;