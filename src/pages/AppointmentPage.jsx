import { NavLink } from "react-router-dom";


function Appointments(props){

    const renderAppointments = () => {
        const result = props.appointments.map( (element) => {
            return (
                <div key={element._id} className="appointment-summary box">
                    <p>{element.date}</p>
                    <p>{element.patient}</p>
                    <NavLink to="/">More details</NavLink> |&nbsp;
                    <NavLink to={`/appointments/${element._id}/edit`}>Edit</NavLink>
                </div>
            )
        });
        return result;
    }
    
    return (
        <div className="AppointmentPage">

            <h1>List of Appointments</h1>

             <section>
                 { props.appointments === null
                    ? <p>loading...</p>
                    : renderAppointments()
                }
             </section>

        </div>
    );
}

export default Appointments;