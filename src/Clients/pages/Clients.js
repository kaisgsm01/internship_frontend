import React, { useContext, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ClientsList from "../components/ClientsList";
const Clients = () => {
  const auth = useContext(AuthContext);
  const [clients, setClients] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = auth.userID;
  useEffect(() =>{
    const fetchClients = async()=>{
      try {

        const data = await sendRequest(`http://localhost:5000/api/users/${uid}/clients`);
        setClients(data);
      } catch (err) {}  
    }
    fetchClients();
  },[sendRequest, uid]);
  const deleteClientHandler = clientID => {
    setClients(clients => clients.filter((client => client._id!==clientID)))
  }
  return <React.Fragment>
  <ErrorModal error={error} onClear={clearError} />
  {isLoading && (
    <div className="center">
      <LoadingSpinner />
    </div>
  )}
  {!isLoading && clients && <ClientsList items={clients} deleteClientHandler={deleteClientHandler} />}
</React.Fragment>;
};

export default Clients;
