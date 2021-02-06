import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MedicalCenter from "./pages/MedicalCenter";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/medicalcenter" component={MedicalCenter} />
    </BrowserRouter>
  );
}

export default Routes;
