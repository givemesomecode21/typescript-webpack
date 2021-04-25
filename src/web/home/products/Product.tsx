import { addCartRequest } from "@/store/cart/cartActions";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Typography } from "antd";
import React from "react";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import "./index.scss";

function Product({ item }) {
  const dispatch = useDispatch();

  const addToCartHandler = (id: string) => {
    dispatch(addCartRequest(id));
  };

  return (
    <div className="product-box">
      <Card style={{ height: 380 }} hoverable>
        <div className="product-img">
          <img alt={item.name} src={item.image} />
        </div>
        <div className="product-name">{item.name}</div>
        <div className="product-price">
          <NumberFormat
            suffix=" đ"
            displayType="text"
            value={item.price}
            thousandSeparator
          />
        </div>
        <Rate disabled defaultValue={item.rate} style={{ fontSize: 13 }} />
        <div className="mt-10 mb-10">
          <Button type="ghost" onClick={() => addToCartHandler(item.id)}>
            <ShoppingCartOutlined /> Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
export { Product };
