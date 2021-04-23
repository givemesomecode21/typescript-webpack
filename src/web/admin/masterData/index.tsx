import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Brand } from './brand';
import { Category } from './category';
import { Payment } from './payment';
import { User } from './user';

const MasterData = ({ match }) => {
  const { path } = match;
  return (
    <>
      <Switch>
        <Route path={`${path}/user`} component={User} />
        <Route path={`${path}/brand`} component={Brand} />
        <Route path={`${path}/category`} component={Category} />
        <Route path={`${path}/payment`} component={Payment} />
        <Redirect from={path} to={`${path}/user`} />
      </Switch>
    </>
  )
}
export { MasterData }