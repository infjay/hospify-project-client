import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Navbar } from 'react-bootstrap';

function Navigationbar(){

    const {isLoggedIn, isLoading, user, logOutUser} = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" className="Navbar">
            <NavLink to="/patients/"> Patient list</NavLink> | &nbsp;
            <NavLink to="/patients/create">New Patient</NavLink> |  &nbsp;
            <NavLink to="/appointments/">Appointments</NavLink> |||  &nbsp;
            <NavLink to="/appointments/create">New Appointment</NavLink> ||| &nbsp;
            <NavLink to="/profile">Profile</NavLink> ||| &nbsp;
            
            { isLoggedIn &&
                <>
                    <span>Welcome, {user.email} </span> 
                    <button onClick={logOutUser}>Logout</button>
                </>
            }

            { !isLoggedIn &&
                <>
                    <NavLink to="/signup">Register</NavLink> | 
                    <NavLink to="/login">Login</NavLink>
                </>
            }
        </Navbar>
    );
}


export default Navigationbar;