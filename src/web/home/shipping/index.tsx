import { saveShippingAddress } from "@/store/cart/cartActions";
import { Button, Card, Col, Form, Input, Row, Steps } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const validateMessages = {
  required: "${label} is required!",
};

const Shipping = ({ history, location }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const { cartItems, shippingAddress } = cart;
  const [form] = Form.useForm();

  useEffect(() => {
    if (cartItems?.length === 0) {
      history.push("/");
    }
  }, [cartItems, history]);

  useEffect(() => {
    if (shippingAddress) {
      form.setFieldsValue({
        address: shippingAddress.address,
        city: shippingAddress.city,
        phoneNumber: shippingAddress.phoneNumber,
      });
    }
  }, [shippingAddress, form]);

  const onFinish = (data) => {
    dispatch(saveShippingAddress(data));
    history.push("/payment");
  };

  return (
    <div className="site-layout-content">
      <Col offset={6} span={12}>
        <Steps current={1} size="small">
          <Steps.Step title="Sign In" />
          <Steps.Step title="Shipping" />
          <Steps.Step title="Payment" />
          <Steps.Step title="Place Order" />
        </Steps>
      </Col>
      <Col offset={3} span={18} className="mt-20">
        <Card>
          <Form
            form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Col offset={3} span={18}>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={3} span={18}>
              <Form.Item
                label="Detailed Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={3} span={18}>
              <Form.Item label="City" name="city" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col offset={3} span={18}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Continue
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Card>
      </Col>
    </div>
  );
};

export { Shipping };
