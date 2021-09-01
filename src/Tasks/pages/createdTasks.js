import React, { useContext, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TasksList from "../components/tasksList";
const CreatedTasks = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = auth.userID;
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/users/${uid}/createdtasks`
        );
        setTasks(data);
      } catch (err) {}
    };
    fetchClients();
  }, [sendRequest, uid]);
  const taskDeleteHandler = (deletedTaskId) => {
    setTasks((tasks) =>
      tasks.filter((task) => task._id !== deletedTaskId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && tasks && (
        <TasksList
          createdTasks
          items={tasks}
          taskDeleteHandler={taskDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default CreatedTasks;
