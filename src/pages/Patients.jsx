import { NavLink } from "react-router-dom";


function Patients(props){

    const renderPatients = () => {
        const result = props.patients.map( (element) => {
            return (
                <div key={element._id} className="patients-summary">
                    <p>First Name: {element.firstName}</p>
                    <p>Last Name: {element.lastName}</p>
                    <p>Email: {element.email}</p>
                    <p>Birthdate: {element.birthDate}</p>
                    <p>BloodType: {element.bloodType}</p>
                    <p>Description: {element.description}</p>
                    <NavLink to={`/patient/${element._id}`}>More details</NavLink> |&nbsp;
                    <NavLink to={`/patients/${element._id}/edit`}>Edit</NavLink>
                </div>
            )

        });
        return result;
    }
    
    return (
        <div className="Patients">

            <h1>List of Patients</h1>

             <section>
                 { props.patients === null
                    ? <p>loading...</p>
                    : renderPatients()
                }
             </section>


        </div>
    );
}

export default Patients;