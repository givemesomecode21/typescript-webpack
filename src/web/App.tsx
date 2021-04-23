import React from "react";
import { Route, Switch, Redirect, useLocation, useHistory, Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';
import { Login } from "./account/login";
import { Home } from "./home";
import { PrivateRoute } from "@/components";
import { Admin } from "./admin";
import { Register } from "./account/register";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute roles={["Admin"]} path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect from="*" to="/" />
    </Switch>
  )
};

export { App };