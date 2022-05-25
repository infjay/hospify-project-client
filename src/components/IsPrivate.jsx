import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

function IsPrivate({ children }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    // If the authentication is still loading 
    if (isLoading) {
        return <p>Loading ...</p>
    } else if (!isLoggedIn) {
        // If the user is not logged in 
        return <Navigate to="/login" />;
    } else {
        // If the user is logged in, allow to see the page 
        return children;
    }
}

export default IsPrivate;
