import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function Navbar(){

    const {isLoggedIn, isLoading, user, logOutUser} = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/patients/create">New Patient</NavLink> | 
            <NavLink to="/appointments/create">New Appointment</NavLink> |||
            <NavLink to="/profile">Profile</NavLink> |||
            
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
        </nav>
    );
}


export default Navbar;