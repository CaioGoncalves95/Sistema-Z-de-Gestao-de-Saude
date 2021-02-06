import React from "react";

import "./styles.css";

const Button = ({ color, text, onSubmit , form}) => {

  return (
    <button className="button" type="submit" onClick={onSubmit} style={{backgroundColor: color}} form={form}>
      {text}
    </button>
  );
};

export default Button;
