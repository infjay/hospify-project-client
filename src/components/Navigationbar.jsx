import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Navbar, Nav} from 'react-bootstrap';
import './Navigationbar.css'
function Navigationbar(){

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" className="Navbar" sticky="top" >

            
            { isLoggedIn &&
                <>
                &nbsp;&nbsp;&nbsp;<Button href="/patients/" className="links"> Patient list</Button> | &nbsp;
            <Button href="/patients/create" className="links">New Patient</Button> |  &nbsp;
            <Button href="/appointments/" className="links" >Appointments</Button> |||  &nbsp;
            <Button href="/appointments/create" className="links">New Appointment</Button> ||| &nbsp;
            <Button href="/profile" className="links">Profile</Button> ||| &nbsp;
             &nbsp;&nbsp;<span className="welcome-email">Welcome, Dr. {user.email} </span> &nbsp;&nbsp;&nbsp;
                    <Button onClick={logOutUser}>Logout</Button>
                </>
            }

            { !isLoggedIn &&
                <>
                    <Button href="/signup" className="links px-5 w-50" >Register</Button> | &nbsp;
                    <Button href="/login" className="links px-5 w-50 ">Login</Button>
                </>
            }
        </Navbar>
    );
}

export default Navigationbar;
