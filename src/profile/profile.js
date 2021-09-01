import React, { useState, useContext, Profiler, useEffect } from "react";

import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import "./PlaceItem.css";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import Input from "../shared/components/FormElements/Input";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const history=useHistory();
  const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      userName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  console.log(formState.inputs);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userID}`
        );
        setLoadedUser(userData);
        setFormData(
          {
            userName: {
              value: userData.userName,
              isValid: true,
            },
            email: {
              value: userData.email,
              isValid: true,
            },
            password: {
              value: userData.password,
              isValid: true,
            },
          },
          true
        );
        console.log("hey " + loadedUser);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest]);
  const updateUserHandler = async (event) => {
    event.preventDefault();
    try {
      sendRequest(
        `http://localhost:5000/api/users/${auth.userID}`,
        "PATCH",
        JSON.stringify({
          userName: formState.inputs.userName.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/');
    } catch (err) {}
  };
  return (
    <Card className="place-item place-item__content">
      {loadedUser && (
        <React.Fragment>
          <div className="place-item__image">
            <img
              src={
                "https://cdn.dribbble.com/users/299663/screenshots/3691201/benzema-01.jpg?compress=1&resize=400x300"
              }
            />
          </div>
          <div className="place-item__info">
            <form onSubmit={updateUserHandler}>
              <fieldset disabled>
              <Input
                  id="firstName"
                  element="input"
                  type="text"
                  label="First Name"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email."
                  onInput={inputHandler}
                  initialValue={loadedUser.firstName}
                  initialValid={true}
                />
               <Input
                  id="firstName"
                  element="input"
                  type="text"
                  label="First Name"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email."
                  onInput={inputHandler}
                  initialValue={loadedUser.lastName}
                  initialValid={true}
                />
              </fieldset>
              <div class="mb-3">
                <Input
                  id="email"
                  element="input"
                  type="text"
                  label="Email"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email."
                  onInput={inputHandler}
                  initialValue={loadedUser.email}
                  initialValid={true}
                />
              </div>
              <div class="mb-3">
                <Input
                  id="userName"
                  element="input"
                  type="text"
                  label="User Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid user name."
                  onInput={inputHandler}
                  initialValue={loadedUser.userName}
                  initialValid={true}
                />
              </div>
              <div class="mb-3">
                <Input
                  id="password"
                  element="input"
                  type="password"
                  label="Password"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Please enter a valid password ( > 5 characters)."
                  onInput={inputHandler}
                  initialValue={loadedUser.password}
                  initialValid={true}
                />
              </div>
              <button type="submit" class="btn btn-outline-info">
                SAVE
              </button>
            </form>
          </div>
        </React.Fragment>
      )}
    </Card>
  );
};

export default Profile;
