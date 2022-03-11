import React from "react";

const Task = ({ data, handler }) => {
  return (
    <>
      <div className="task" onClick={() => handler(data)}>
        <div className="task-header">
          <div className="task-username">{data.username}</div>
          <div className="task-email">{data.email}</div>
        </div>
        <div className="task-text">{data.description}</div>
        {data.redacted && <div className="task-redacted">Edited by admin</div>}
        <div className={`task-status status-${data.completed}`}>
          {data.completed ? "Done" : "In progress"}
        </div>
      </div>
    </>
  );
};

export default Task;
