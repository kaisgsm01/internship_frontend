import React, { useContext, useEffect, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./ClientForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";

const UpdateClient = () => {
  const history=useHistory();
  const cid = useParams().cid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedClient, setLoadedClient] = useState(); //if there is no argument in usestate there is no state so there is no rendering
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      twitter: {
        value: "",
        isValid: true,
      },
      linkedin: {
        value: "",
        isValid: true,
      },
      facebook: {
        value: "",
        isValid: true,
      },
      telephone: {
        value: "",
        isValid: true,
      },
    },
    false
  );
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const clientData = await sendRequest(
          `http://localhost:5000/api/clients/${cid}`
        );

        setLoadedClient(clientData);
        setFormData(
          {
            name: {
              value: clientData.name,
              isValid: false,
            },
            twitter: {
              value: clientData.twitter,
              isValid: true,
            },
            linkedin: {
              value: clientData.linkedin,
              isValid: true,
            },
            facebook: {
              value: clientData.facebook,
              isValid: true,
            },
            telephone: {
              value: clientData.telephone,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, cid, setFormData]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/clients/${cid}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {loadedClient && (
          <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedClient.name}
          />
          <Input
            id="facebook"
            element="input"
            type="text"
            label="Facebook"
            validators={[]}
            initialValid={true}
            onInput={inputHandler}
            initialValue={loadedClient.facebook}
          />
          <Input
            id="twitter"
            element="input"
            type="text"
            label="Twitter"
            validators={[]}
            initialValid={true}
            onInput={inputHandler}
            initialValue={loadedClient.twitter}
          />
          <Input
            id="linkedin"
            element="input"
            type="text"
            label="Linkedin"
            validators={[]}
            initialValid={true}
            onInput={inputHandler}
            initialValue={loadedClient.linkedin}
          />
          <Input
            id="telephone"
            element="textarea"
            label="Phone"
            validators={[]}
            initialValid={true}
            onInput={inputHandler}
            initialValue={loadedClient.telephone}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD CLIENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateClient;
