import { Breadcrumb } from 'antd';
import React from 'react';

const Order = (props) => {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, height: 360 }}>
      Order
      </div>
    </>
  )
}

export { Order }