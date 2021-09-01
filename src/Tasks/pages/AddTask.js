import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./MemoForm.css";
import "../../../src/shared/components/FormElements/Input.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AssignUsersInput from "../components/assignedUsersInuput";
import { useHistory } from "react-router-dom";
const AddTask = () => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      assign: {
        value: [],
        isValid: true,
      },
    },
    false
  );

  const placeSubmitHandler =async (event) => {
    event.preventDefault();
    try {
      const uid = auth.userID;
      console.log(formState.inputs.title.value);
      await sendRequest(
        `http://localhost:5000/api/users/${uid}/tasks`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          creator: uid,
          assignedTo: formState.inputs.assign.value.length !==0 ? formState.inputs.assign.value : uid,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/');
    } catch (err) {}
  };
  console.log(formState);
  return (
    <React.Fragment>
    {isLoading && <Card><LoadingSpinner asOverlay /></Card>}
      {!isLoading && <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <AssignUsersInput id="assign" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          ADD MEMO
        </Button>
      </form>}
    </React.Fragment>
  );
};

export default AddTask;
