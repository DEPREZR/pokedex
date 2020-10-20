import React from "react";
import { Spin } from "antd";

const Loader = ({ children, loading }) => {
  return loading ? (
    <div
      style={{
        textAlign: "center",
        marginBottom: 20,
        padding: "30px 50px",
        margin: "20px 0"
      }}
    >
      <Spin />
    </div>
  ) : (
    children()
  );
};

export default Loader;
