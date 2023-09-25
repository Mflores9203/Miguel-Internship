import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width:'100%',
        height: 'auto',
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
