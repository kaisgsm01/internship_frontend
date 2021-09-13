import React, { useContext } from "react";
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
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

const AddClient = () => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
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

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const uid = auth.userID;
      await sendRequest(
        `http://localhost:5000/api/users/${uid}/clients`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          twitter: formState.inputs.twitter.value,
          linkedin:formState.inputs.linkedin.value,
          facebook:formState.inputs.facebook.value,
          telephone:formState.inputs.telephone.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {isLoading && <Card><LoadingSpinner asOverlay /></Card>}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="facebook"
          element="input"
          type="text"
          label="Facebook"
          validators={[]}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="twitter"
          element="input"
          type="text"
          label="Twitter"
          validators={[]}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="linkedin"
          element="input"
          type="text"
          label="Linkedin"
          validators={[]}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="telephone"
          element="textarea"
          label="Phone"
          validators={[]}
          initialValid={true}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD CLIENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddClient;
