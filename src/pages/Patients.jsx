import { NavLink } from "react-router-dom";


function Patients(props){

    const renderPatients = () => {
        const result = props.patients.map( (element) => {
            return (
                <div key={element._id} className="patients-summary box">
                    {console.log(element)}
                    <p>{element.firstName}</p>
                    <p>{element.lastName}</p>
                    <p>{element.email}</p>
                    <p>{element.birthDate}</p>
                    <p>{element.bloodType}</p>
                    <p>{element.description}</p>
                    <NavLink to="/">More details</NavLink> |&nbsp;
                    <NavLink to={`/Patients/${element._id}/edit`}>Edit</NavLink>
                </div>
            )
        });
        return result;
    }
    
    return (
        <div className="PatientsPage">

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