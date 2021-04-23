import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Product } from './product';
import { Order } from './order';
import { Dashboard } from './dashboard';
import { AdminLayout } from '@/layouts';
import { MasterData } from './masterData';

const Admin = (props) => {
  const { match: { path } } = props;
  return (
    <AdminLayout {...props}>
      <div className="site-layout-background" style={{ padding: 10 }}>
        <Switch>
          <Route path={`${path}/dashboard`} component={Dashboard} />
          <Route path={`${path}/product`} component={Product} />
          <Route path={`${path}/order`} component={Order} />
          <Route path={`${path}/master-data`} component={MasterData} />
          <Redirect from={path} to={`${path}/dashboard`} />
        </Switch>
      </div>
    </AdminLayout>
  )
}

export { Admin }