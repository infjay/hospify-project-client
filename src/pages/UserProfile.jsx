import { useState } from "react";
import React from "react";
import axios from "axios";

function UserProfile() {
  const [userInfo, setUserInfo] = useState("");
  const storedToken = localStorage.getItem("authToken");

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/login`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => setUserInfo(result.data))
      .catch((err) => console.log("there is an error", err));
  }, []);

  return (
   
   <h1>
   <br />
      Welcome Dr. {userInfo?.response?.firstName} {userInfo?.response?.lastName}
  <br />
    </h1>
  
  );
}

export default UserProfile;
