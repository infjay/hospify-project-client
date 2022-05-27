import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function Patients(props) {
  const renderPatients = () => {
    const result = props.patients.map((element) => {
      return (

  <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Patinet</Card.Title>
    <Card.Subtitle className="mb-2 text-muted"><p>First Name: {element.firstName}</p><p>Last Name: {element.lastName}</p></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted"><p>Email: {element.email}</p></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted"><p>Birthdate: {element.birthDate}</p></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted"><p>BloodType: {element.bloodType}</p></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted"><p>Description: {element.description}</p></Card.Subtitle>
    <NavLink to={`/patients/${element._id}/edit`}>Edit</NavLink>
    </Card.Body>
   </Card>
        
      );
    });
    return result;
  };

  return (
    <div className="Patients">
      <h1>List of Patients</h1>

      <section>
        {props.patients === null ? <p>loading...</p> : renderPatients()}
      </section>
    </div>
  );
}

export default Patients;
