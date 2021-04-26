import { orderService, userService } from "@/services";
import { clearCartItems } from "@/store/cart/cartActions";
import { Button, Card, Col, message, Row, Steps, Table } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const Order = ({ history }) => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const { paymentMethod, cartItems, shippingAddress } = cart;
  const user = userService.userValue;

  const [priceObject, setPriceObject] = useState<any>(null);

  useEffect(() => {
    if (!paymentMethod) {
      history.push("/payment");
    }
  }, [paymentMethod, history]);

  useEffect(() => {
    if (cartItems?.length === 0) {
      history.push("/");
    }
    const rs: any = {};
    rs.itemPrice = addDecimals(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    rs.shippingPrice = addDecimals((0.05 * rs.itemPrice).toFixed(2));
    rs.taxPrice = addDecimals((0.1 * rs.itemPrice).toFixed(2));
    rs.totalPrice = (
      Number(rs.itemPrice) +
      Number(rs.shippingPrice) +
      Number(rs.taxPrice)
    ).toFixed(2);

    setPriceObject(rs);
  }, [history, cartItems]);

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (text) => {
        return <img src={text} width={50} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <NumberFormat
          displayType="text"
          value={text}
          suffix={" đ"}
          thousandSeparator
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <NumberFormat
          displayType="text"
          value={record?.price * record.quantity}
          thousandSeparator
          suffix={" đ"}
        />
      ),
    },
  ];

  const placeOrderHandler = () => {
    const productList = cart.cartItems.map((item) => ({
      id: item.id,
      quantity: +item.quantity,
      price: +item.price,
    }));
    const param = {
      orderDetail: productList,
      itemPrice: +priceObject.itemPrice,
      shippingPrice: +priceObject.shippingPrice,
      taxPrice: +priceObject.taxPrice,
      totalPrice: +priceObject.totalPrice,
      shippingAddress: shippingAddress.address,
      paymentMethodId: paymentMethod.payment,
      phoneNumber: shippingAddress.phoneNumber
    };
    orderService.create(param).then((res) => {
      if (res) {
        message.success("Place order successfully!");
        dispatch(clearCartItems());
        history.push("/");
      }
    });
  };

  return (
    <div className="site-layout-content">
      <Col offset={6} span={12}>
        <Steps current={3} size="small">
          <Steps.Step title="Sign In" />
          <Steps.Step title="Shipping" />
          <Steps.Step title="Payment" />
          <Steps.Step title="Place Order" />
        </Steps>
      </Col>
      <Row gutter={8} className="mt-20">
        <Col span={18}>
          <Card>
            <Table
              pagination={{ hideOnSinglePage: true }}
              dataSource={cartItems}
              columns={columns}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <p>
              <b>Name</b>: {user.displayName ? user.displayName : user?.firstName + " " + user?.lastName}
            </p>
            <p>
              <b>Phone number</b>: {shippingAddress?.phoneNumber}
            </p>
            <p>
              <b>Address</b>:{" "}
              {shippingAddress?.address +
                " " +
                shippingAddress?.city
              }
            </p>
            <p>
              <b>Subtotal</b>:{" "}
              <NumberFormat
                displayType="text"
                value={priceObject?.itemPrice}
                thousandSeparator
                suffix=" đ"
              />
            </p>
            <p>
              <b>Tax price</b>:{" "}
              <NumberFormat
                displayType="text"
                value={priceObject?.taxPrice}
                thousandSeparator
                suffix=" đ"
              />
            </p>
            <p>
              <b>Shipping fee</b>:{" "}
              <NumberFormat
                displayType="text"
                value={priceObject?.shippingPrice}
                thousandSeparator
                suffix=" đ"
              />
            </p>
            <p>
              <b>Total</b>:{" "}
              <NumberFormat
                displayType="text"
                value={priceObject?.totalPrice}
                thousandSeparator
                suffix=" đ"
              />
            </p>
            <Button block type="primary" onClick={placeOrderHandler}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { Order };
