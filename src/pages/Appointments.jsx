import { NavLink } from "react-router-dom";
import "./Appointments.css";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Appointments(props) {
  const renderAppointments = () => {
    const result = props?.appointments?.map((element) => {
      return (  

        <Card>
  <Card.Header><p> Date: {element?.date}   {element?.time}</p></Card.Header>
  <Card.Body>
    <Card.Title> <p>Dr.{element?.doctor?.lastName}</p></Card.Title>
    <Card.Text>
        <p>
          Patient: {element?.patient?.firstName} {element.patient.lastName}
       </p>
    </Card.Text>
    <Button href={`/appointments/${element._id}/edit`} variant="primary">Edit</Button> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button href={`/appointments/${element._id}`} variant="primary">More Details</Button>
  </Card.Body>
</Card>
        
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
