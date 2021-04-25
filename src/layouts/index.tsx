import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, Dropdown, Layout, Menu, notification } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExportOutlined,
  ScheduleOutlined,
  DiffOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { Footer } from "antd/lib/layout/layout";
import { hubService, orderService, userService } from "@/services";
const { Header, Sider, Content } = Layout;
import "./index.scss";

const AdminLayout = ({ children, match, location }) => {
  const history = useHistory();
  const { path } = match;
  const { pathname } = location;
  const [collapsed, setCollapsed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    orderService.getTotalCountNewOrder().then((x) => setCount(x));
  }, []);

  useEffect(() => {
    const subscription = hubService.orderChanged$.subscribe((x: any) => {
      setCount(x);
      notification.info({
        message: `There is a new order!`,
        placement: "bottomRight",
      });
    });
    // return subscription.unsubscribe();
  }, []);

  const seenNewOrderHanlder = () => {
    if (count > 0) {
      orderService.changeStatus({ isNew: false }).then((x) => {
        setCount(0);
        history.push("/admin/order");
      });
    }
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    userService.logout();
    history.push("/");
  };

  return (
    <div className="admin-layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
            <Menu.Item key="/admin/dashboard" icon={<PieChartOutlined />}>
              <NavLink to={`${path}/dashboard`}>Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/order" icon={<DiffOutlined />}>
              <NavLink to={`${path}/order`}>Order</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/product" icon={<GiftOutlined />}>
              <NavLink to={`${path}/product`}>Product</NavLink>
            </Menu.Item>
            <SubMenu
              key="/admin/master-data"
              icon={<ScheduleOutlined />}
              title="Master data"
            >
              <Menu.Item key="/admin/master-data/user">
                <NavLink to={`${path}/master-data/user`}>User</NavLink>
              </Menu.Item>
              <Menu.Item key="/admin/master-data/brand">
                <NavLink to={`${path}/master-data/brand`}>Brand</NavLink>
              </Menu.Item>
              <Menu.Item key="/admin/master-data/category">
                <NavLink to={`${path}/master-data/category`}>Category</NavLink>
              </Menu.Item>
              <Menu.Item key="/admin/master-data/payment">
                <NavLink to={`${path}/master-data/payment`}>
                  Payment Method
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="8" icon={<ExportOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: onCollapse,
                }
              )}
              <div style={{ textAlign: "right", paddingRight: "50px" }}>
                <Dropdown
                  overlay={
                    <Menu onClick={seenNewOrderHanlder}>
                      <Menu.Item key="0">Have {count} new order(s)</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Badge count={count} size="small">
                    <NotificationOutlined
                      style={{ fontSize: "20px", color: "#000" }}
                    />
                  </Badge>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export { AdminLayout };
