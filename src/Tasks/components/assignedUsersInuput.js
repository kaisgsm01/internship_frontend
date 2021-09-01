import React, { Component, useReducer, useEffect, useContext, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import "./Input.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const inputReducer = (state, action) => {
  return {
    ...state,
    value: action.val,
    isValid: true,
  };
};

const AssignUsersInput = (props) => {
  const auth = useContext(AuthContext);
  const [assigned, setAssigned] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = auth.userID;
  useEffect(() => {
    const fetchassigned = async () => {
      try {
        const data = await sendRequest(`http://localhost:5000/api/users/`);
        setAssigned(data);
      } catch (err) {}
    };
    fetchassigned();
  }, [sendRequest, uid]);
  const options = assigned.map(e =>{return{value:e,label: e.userName} }).filter(e => e.value.id!==uid);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: [],
    isValid: true,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (val) => {
    dispatch({
      val: val.map(e =>e.value.id),
    });

  };

  return (
    <div className={"form-control"}>
      <label htmlFor={props.id}>Assign to</label>
      <Select
        options={options}
        onChange={changeHandler}
        isMulti
        makeAnimated
        components={makeAnimated()}
      />
    </div>
  );
};

export default AssignUsersInput;
