import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [specialty, setSpecialty] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { email, password, specialty};

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("error creating account", errorDescription)
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="Signup">
            <h1>Register</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Specialty:</label>
                <input
                    type="String"
                    name="Specialty"
                    value={specialty}
                    required={true}
                    onChange={(e) => setSpecialty(e.target.value)}
                />
                


                <button type="submit">Sign Up</button>
            </form>

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default Signup;