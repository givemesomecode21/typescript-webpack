import React, { useState } from 'react';
import { Badge, Breadcrumb, Layout, Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Footer } from 'antd/lib/layout/layout';
import { userService } from '@/services';
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children, match }) => {
  const history = useHistory();
  const { path } = match;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  }

  const logout = () => {
    userService.logout();
    history.push("/");
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to={`${path}/dashboard`}>Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <NavLink to={`${path}/product`}>Product</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <NavLink to={`${path}/order`}>Order</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Master data">
            <Menu.Item key="4">
              <NavLink to={`${path}/master-data/user`}>User</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to={`${path}/master-data/brand`}>Brand</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to={`${path}/master-data/category`}>Category</NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to={`${path}/master-data/payment`}>Payment Method</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<PieChartOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: onCollapse,
            })}
            <div style={{ textAlign: "right", paddingRight: "50px" }}>
              <Badge count={5} size="small">
                <NotificationOutlined style={{ fontSize: '20px', color: '#000' }} />
              </Badge>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export { AdminLayout }