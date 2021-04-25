import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import "antd/dist/antd.css";
import { Login } from "./account/login";
import { Home } from "./home";
import { PrivateRoute } from "@/components";
import { Admin } from "./admin";
import { Register } from "./account/register";
import { hubService, userService } from "@/services";
import { API_URL } from "@/constants";
import { notification } from "antd";

const App = () => {
  const [user, setUser] = useState({});
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${API_URL}/realtime`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection && connection.state !== HubConnectionState.Connected) {
      connection.start().then(
        () => {
          hubService.connectionEstablished$.next(true);
          connection.on("OrderAddNew", (data) => {
            hubService.orderChanged$.next(data);
          });
        },
        (error) => console.error(error)
      );
    }
  }, [connection]);

  return (
    <Switch>
      <PrivateRoute roles={["Admin"]} path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export { App };
