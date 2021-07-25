import React from "react";

import "./MainHeader.css";

//This component is a styling component
const MainHeader = (props) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;