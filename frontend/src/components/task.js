import React from "react";

const Task = ({ data }) => {
  return (
    <div className="task">
      <div className="task-header">
        <div className="task-username">{data.username}</div>
        <div className="task-email">{data.email}</div>
      </div>
      <div className="task-text">{data.description}</div>
    </div>
  );
};

export default Task;
