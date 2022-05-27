import { NavLink } from "react-router-dom";
import "./Appointments.css";
import { Card, CardGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function Appointments(props) {
  const renderAppointments = () => {
    const result = props?.appointments?.map((element) => {
      return (


        <CardGroup>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title><p>{element?.date}</p> <p>{element?.time}</p></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><p>
            {element?.patient?.firstName} {element.patient.lastName}
          </p></Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"><p>Dr.{element?.doctor?.lastName}</p></Card.Subtitle>
      
          <NavLink to={`/appointments/${element._id}`}>More details</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <NavLink to={`/appointments/${element._id}/edit`}>Edit</NavLink>
          </Card.Body>
         </Card>
        </CardGroup>

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
