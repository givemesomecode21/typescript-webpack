import { addCartItem, removeCartItem } from "@/store/cart/cartActions";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Select, Table } from "antd";
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

const ShoppingCart = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  const onDeleteHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const onChange = (item) => (value) => {
    const payload = { ...item, quantity: value };
    dispatch(addCartItem(payload));
  };

  const redirectToShipping = () => {
    history.push("/shipping");
  };
  
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
      render: (text, record: any) => (
        <Select
          placeholder="Search to Select"
          defaultValue={text}
          onChange={onChange(record)}
        >
          {Array.from({ length: record.countInStock }, (_, i) => i).map(
            (item, index) =>
              item && (
                <Select.Option key={index} value={item + ""}>
                  {item}
                </Select.Option>
              )
          )}
        </Select>
      ),
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
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <DeleteOutlined
          style={{ color: "#ff4d4f" }}
          onClick={() => onDeleteHandler(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="shopping-cart site-layout-content">
      <Table
        pagination={{ hideOnSinglePage: true }}
        dataSource={cartItems}
        columns={columns}
      />
      <div className="btn-checkout">
        <Button type="primary" htmlType="button" onClick={redirectToShipping}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export { ShoppingCart };
