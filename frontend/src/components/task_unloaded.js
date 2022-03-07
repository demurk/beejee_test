import React from "react";

import LoadingBlock from "./loading_block";

const TaskUnloaded = () => {
  return (
    <div className="task task-unloaded">
      <LoadingBlock />
    </div>
  );
};

export default TaskUnloaded;
