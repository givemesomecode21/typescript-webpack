import { User } from '@/models';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from '@/services';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      const user: User = userService.userValue;
      if (!user) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      if (roles?.length > 0 && roles.indexOf(user.role) === -1) {
        // role not authorized so redirect to home page
        return <Redirect to={{ pathname: '/' }} />
      }

      // authorized so return component
      return (
        <Component {...props} />
      )

    }} />
  );
}
export { PrivateRoute }