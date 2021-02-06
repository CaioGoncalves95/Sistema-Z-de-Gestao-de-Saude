import React from "react";

import "./styles.css";

const Input = ({ title, type, onChange }) => {
  return (
    <div className="all">
      <p className="title">{title}</p>
      <input className="input" type={type} onChange={onChange} />
    </div>
  );
};

export default Input;
