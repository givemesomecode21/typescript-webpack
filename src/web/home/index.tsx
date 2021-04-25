import React from "react";
import { Badge, Layout, Menu, notification } from "antd";
import { About } from "./about";
import { Contact } from "./contact";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Products } from "./products";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./index.scss";
import { ShoppingCart } from "./shopping-cart";
import { useSelector } from "react-redux";
import { Shipping } from "./shipping";
import { PrivateRoute } from "@/components";
import { Payment } from "./payment";
import { Order } from "./order";

const { Header, Content, Footer } = Layout;

const Home = ({ history }) => {
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  const redirectToCart = () => {
    history.push("/shopping-cart");
  };

  return (
    <div className="home-layout">
      <Layout>
        <Header>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to={"/"}>Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={"/about"}>About</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={"/contact"}>Contact</Link>
              </Menu.Item>
            </Menu>
            <div style={{ textAlign: "right" }}>
              <Badge count={cartItems?.length} size="small">
                <ShoppingCartOutlined
                  onClick={redirectToCart}
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
            </div>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            <Route path={`/product`} component={Products} />
            <Route path={`/about`} component={About} />
            <Route path={`/contact`} component={Contact} />
            <PrivateRoute roles={[]} path="/shipping" component={Shipping} />
            <PrivateRoute roles={[]} path="/payment" component={Payment} />
            <PrivateRoute roles={[]} path="/place-order" component={Order} />
            <Route path={`/shopping-cart`} component={ShoppingCart} />
            <Redirect from={"/"} to={`/product`} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </div>
  );
};
export { Home };
