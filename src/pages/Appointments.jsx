import { NavLink } from "react-router-dom";
import "./Appointments.css";

function Appointments(props) {
  const renderAppointments = () => {
    const result = props?.appointments?.map((element) => {
      return (
        <div key={element._id} className="appointment-summary">
          <p>{element.date}</p>
          <p>{element.time}</p>
          <p>
            {element.patient.firstName} {element.patient.lastName}
          </p>
          <p>{element?.doctor?.email}</p>
          <NavLink to={`/appointments/${element._id}`}>
            More details
          </NavLink>{" "}
          |&nbsp;
          <NavLink to={`/appointments/${element._id}/edit`}>Edit</NavLink>
        </div>
      );
    });
    return result;
  };

  return (
    <div className="Appointment">
      <h1>List of Appointments</h1>

      <section>
        {props.appointments === null ? <p>loading...</p> : renderAppointments()}
      </section>
    </div>
  );
}

export default Appointments;
