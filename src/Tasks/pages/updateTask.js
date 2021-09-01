import React, { useContext, useEffect, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./MemoForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";

const UpdateTask = () => {
  const history=useHistory();
  const tid = useParams().tid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTask, setLoadedTask] = useState(); //if there is no argument in usestate there is no state so there is no rendering
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    console.log("starting mounting");
    const fetchPlace = async () => {
      try {
        const taskData = await sendRequest(
          `http://localhost:5000/api/tasks/${tid}`
        );

        setLoadedTask(taskData);
        setFormData(
          {
            title: {
              value: taskData.title,
              isValid: true,
            },
            description: {
              value: taskData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, tid, setFormData]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/tasks/${tid}`,
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
      {loadedTask && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedTask.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedTask.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateTask;
