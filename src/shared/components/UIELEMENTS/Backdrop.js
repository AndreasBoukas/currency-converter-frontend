import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

//This component is the backdrop tha renders when the side drawer is open on mobile view
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
