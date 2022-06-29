import React from "react";
import "./styles.scss";

const ReactButton = (props) => {
  return (
    <button className="btn-buy" onClick={props.onClick}>
      Buy for 66,00 $
    </button>
  );
};

export default ReactButton;
