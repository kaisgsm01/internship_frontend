import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    if (isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: true,
          },
        },
        false
      );
    } else {
      // userName, email, password,firstName,lastName
      setFormData(
        {
          ...formState.inputs,
          userName: undefined,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.userID);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            userName: formState.inputs.userName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            firstName:formState.inputs.firstName.value,
            lastName:formState.inputs.lastName.value
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userID);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={onSubmitHandler}>
          {!isLogin && (
            <React.Fragment>
              {" "}
              <Input
                element="input"
                id="userName"
                label="User Name"
                type="text"
                errorText="Please enter a valid user name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="firstName"
                label="First Name"
                type="text"
                errorText="Please enter a valid first name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
                 <Input
                element="input"
                id="lastName"
                label="Last Name"
                type="text"
                errorText="Please enter a valid last name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </React.Fragment>
          )}
          <Input
            element="input"
            id="email"
            label="Email"
            type="text"
            errorText="Please enter a valid email address"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            label="Password"
            type="password"
            errorText="Please enter a valid Password"
            validators={[VALIDATOR_MINLENGTH(7)]}
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
