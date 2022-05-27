import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AppoitmentDetails(props) {
  const { appointmentId } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    const storedToken = localStorage.getItem("authToken");
    axios.get(`${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => console.log("error getting details ", err));
  };

  const deleteAppointment = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        props.getAppointments();
        navigate("/appointments");
      })
      .catch((e) => console.log("error deleting route on axios", e));
  };

  const renderAppointmentDet = () => {
    return (
      <div key={details?._id} className="appointment-summary">
        <p>
          Date: {details?.date} &nbsp;&nbsp;|&nbsp;&nbsp;{details?.time}
        </p>
        <p>
          Name: {details?.patient?.firstName} {details?.patient?.lastName}
        </p>
        <p>
          Birth Date:{details?.patient?.birthDate} &nbsp; | &nbsp;Blood Type:{" "}
          {details?.patient?.bloodType}
        </p>
        <p>
          {details?.doctor?.firstName} {details?.doctor?.lastName}
        </p>
        <NavLink to={`/appointments/${details._id}/edit`}>Edit</NavLink> <br />
        <Button onClick={deleteAppointment}>Complete</Button>
      </div>
    );
  };

  return (
    <div>
      <h1>Appointment details</h1>

      <section>
        {details === null ? <p>loading...</p> : renderAppointmentDet()}
      </section>
    </div>
  );
}

export default AppoitmentDetails;
