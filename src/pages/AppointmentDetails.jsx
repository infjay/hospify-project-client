import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";



function AppDetails(props) {
    const { appointmentId } = useParams()

    const [ details , setDetails] = useState(null)

    useEffect( () => {
        getDetails();
    }, []);

    console.log(details)

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
   
    const renderAppointmentDet = () => {
            return (
                <div key={details._id} className="appointment-summary">
                    <p>Date: {details.date} {details.time}</p>
                    <p>Name: {details.patient.firstName} {details.patient.lastName}</p>
                    <p>{details.patient.birthDate} {details.patient.bloodType}</p>
                    <p>{details.doctor.firstName}</p>
                    <NavLink to={`/appointments/${details._id}/edit`}>Edit</NavLink>
                </div>
            )
        };
    


    return(
        <div>
        <h1>Appointment details</h1>

        <section>
                 { details === null
                    ? <p>loading...</p>
                    : renderAppointmentDet()} 

             </section>

        </div>
    )
}

export default AppDetails;