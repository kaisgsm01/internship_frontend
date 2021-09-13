import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./tasksList.css";
import TaskItem from "./taskItem";

const TasksList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Tasks Found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="clients-list">
      {props.items.map((task) => {
        if (props.createdTasks){
          return(
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              addedDate={task.addedDate}
              assignedTo={task.assignedTo}
              description={task.description}
              taskDeleteHandler={props.taskDeleteHandler}
            />
          )
        }
        else{return(
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            addedDate={task.addedDate}
            creator={task.creatorName}
            description={task.description}
            taskDeleteHandler={props.taskDeleteHandler}
          />
        )}
      })}
    </ul>
  );
};

export default TasksList;
