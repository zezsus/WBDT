/** @format */

import React from "react";
import NavbarComponent from "../navigator/navbar/components/navbar.component";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
