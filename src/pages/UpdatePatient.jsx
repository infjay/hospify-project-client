import { useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export default function UpdatePatient (props) {



const navigate = useNavigate();

const {patientId} = useParams();

const patientDetails = props.patients?.find( patient => patient._id === patientId);

const [firstName, setFirstName ] = useState(patientDetails?.firstName);
const [lastName, setLastName ] = useState(patientDetails?.lastName);
const [email, setEmail ] = useState(patientDetails?.email);
const [birthDate, setBirthDate ] = useState(patientDetails?.birthDate);
const [bloodType, setBloodType ] = useState(patientDetails?.bloodType);
const [description, setDescription ] = useState(patientDetails?.description);


const handleSubmit = (e) => {
    e.preventDefault();


    const newPatient = {firstName, lastName, email, birthDate, bloodType, description};

     const storedToken = localStorage.getItem('authToken');


    axios.put(`${process.env.REACT_APP_API_URL}/patients/${patientId}`,
     newPatient,
     { headers: { Authorization: `Bearer ${storedToken}`} }
     )
        .then( response => {
            props.callbackUpdatePat();

            navigate("/patients")
        })
        .catch( e => console.log("error creating a patient, react route", e));
     }




return(

    <section className="CreatePatient">
    <br /><br /><br />
    <h1>Update Patient Information</h1>
    <br /><br />
        <form onSubmit={handleSubmit}>
            <label>
                First Name:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                name="firstName"
                value={firstName}
                required={true}
                onChange={(e) =>setFirstName(e.target.value)} />

            </label>
            <label>
               Last Name:  &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" name="lastName" value={lastName} required={true} onChange={(e) => setLastName(e.target.value)} />

            </label>
            <br /><br />

            <label>
                Email: &nbsp;
                <input type='text' name='email' value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br /><br />

            <label>
            Birth Date: &nbsp;
                <input type='date' name='birthDate' value={birthDate} required={true} onChange={(e) => setBirthDate(e.target.value)} />
            </label>

            <label>
            Description: &nbsp;
                <input type='text' name='description' value={description} required={true} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
            Blood Type: &nbsp;
                <input type='text' name='bloodType' value={bloodType} required={true} onChange={(e) => setBloodType(e.target.value)} />
            </label>
            <br /><br />


            <button type="submit">Update Patient</button>
        </form>

    </section>
    )
}





