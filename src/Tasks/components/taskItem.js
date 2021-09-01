import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./taskItem.css";
const TaskItem = (props) => {
  const tid = props.id;
  let history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteTask = async () => {
    try {
      await sendRequest(`http://localhost:5000/api/tasks/${tid}`, "DELETE");
    } catch (err) {}
    props.taskDeleteHandler(tid);
  };
  const updateTask = () => {
    history.push(`/updatetask/${tid}`);
  };
  let usersString = "";
 if(props.assignedTo){
  let arrayOfUsers = props.assignedTo;
  arrayOfUsers.forEach((e, i) => (usersString = usersString + e + " "));
 }
  console.log(usersString);
  if (props.assignedTo) {
    return (
      <li className="task-item">
        <Card className="task-item__content">
          <div className="task-item__info">
            <h2>Title: {props.title}</h2>
            <h3>Assigned to :{usersString}</h3>
            <p>Description: {props.description}</p>
            <p>Added date: {props.addedDate}</p>
          </div>
          <button
            type="button"
            class="btn btn-outline-info"
            onClick={updateTask}
          >
            Update
          </button>
          <button type="button" onClick = {deleteTask}class="btn btn-outline-dark">
            Delete
          </button>
        </Card>
      </li>
    );
  } else {
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <li className="task-item">
          <Card className="task-item__content">
            <div className="task-item__info">
              <h2>Title: {props.title}</h2>
              <h3>Creator: {props.creator}</h3>
              <p>Description: {props.description}</p>
              <p>Added date: {props.addedDate}</p>
            </div>
          </Card>
        </li>
      </React.Fragment>
    );
  }
};

export default TaskItem;
