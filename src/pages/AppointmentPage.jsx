import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Appointments() {

    const [date, setDate] = useState("");
    const [doctor, setDoctor] = useState("");
    const [patient , setPatient] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAppointment = {
            date,
            doctor,
            patient,
        }

        axios.post(process.env.REACT_APP_API_URL + "/appointments", newAppointment)
            .then(response => {
                console.log(response.data)

                navigate("/appointments"); // redirect to Appointment list
                // navigate(`/appointments/${response.data._id}`); // redirect to Appointment page

                // clear form...
                setDate("");
                setDoctor("");
            })
            .catch(e => console.log("error creating Appointment...", e));

    }

    return (
        <section className="AddAppointmentPage">
            <h1>Create a new Appointment</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Date
                    <input
                        type="date"
                        name="doctor"
                        value={date}
                        required={true}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
            
                <label>
                    Doctor
                    <input
                        type="text"
                        name="description"
                        value={doctor} 
                        required={true}
                        onChange={(e) => setDoctor(e.target.value)}
                    />
                </label>

                <label>
                    Patient Name
                    <input
                        type="text"
                        name="patientname"
                        value={patient} 
                        required={true}
                        onChange={(e) => setPatient(e.target.value)}
                    />
                </label>


                <button type="submit">Create Appointment</button>

            </form>

        </section>
    )
}

export default Appointments;