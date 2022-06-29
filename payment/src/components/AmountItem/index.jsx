import React from "react";
import "./styles.scss";

const AmountItem = (props) => {
  return <div className="cart">Orders: {props.childElement} items</div>;
};

export default AmountItem;
