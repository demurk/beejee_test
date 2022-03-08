import React from "react";

import "../styles/loading_block.scss";

const LoadingBlock = () => {
  return (
    <div className="task task-unloaded">
      <div className="ldr">
        <div className="ldr-blk"></div>
        <div className="ldr-blk an_delay"></div>
        <div className="ldr-blk an_delay"></div>
        <div className="ldr-blk"></div>
      </div>
    </div>
  );
};

export default LoadingBlock;
