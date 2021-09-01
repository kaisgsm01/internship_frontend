import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./welcome.css";
const Welcome = () => {
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = auth.userID;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await sendRequest(
          `http://localhost:5000/api/users/${userID}`
        );
        setLoadedUser(userData);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest, userID]);

  return (
    <div className="hello-message">
      <h1>{loadedUser && `Welcome,`}</h1>
      <h1>{loadedUser && `${loadedUser.firstName}`}</h1>
    </div>
  );
};

export default Welcome;
