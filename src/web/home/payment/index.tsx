import { paymentMethodService } from "@/services";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "@/store/cart/cartActions";
import { Button, Card, Col, Form, Input, Select, Steps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const validateMessages = {
  required: "${label} is required!",
};
const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const [form] = Form.useForm();

  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    paymentMethodService.getAll().then((x) => setPayments(x));
  }, []);

  const paymentSource = useMemo(
    () => payments.map((item: any) => ({ value: item.id, label: item.name })),
    [payments]
  );

  useEffect(() => {
    if (cartItems?.length === 0) {
      history.push("/");
    }
  }, [cartItems, history]);

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, [shippingAddress, history]);

  useEffect(() => {
    if (paymentMethod) {
      form.setFieldsValue({
        payment: paymentMethod.payment,
      });
    }
  }, [paymentMethod, form]);

  const onFinish = (data) => {
    dispatch(savePaymentMethod(data));
    history.push("/place-order");
  };

  return (
    <div className="site-layout-content">
      <Col offset={6} span={12}>
        <Steps current={2} size="small">
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
                label="Payment"
                name="payment"
                rules={[{ required: true }]}
              >
                <Select options={paymentSource} />
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

export { Payment };
