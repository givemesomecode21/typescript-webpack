import React from "react";
import { Form, Button, Input, Row, Col, Checkbox, Card } from "antd";
import { userService } from "@/services";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const Register = ({ history, location }) => {
  const onFinish = (data) => {
    userService
      .register(data)
      .then(() => {
        history.push("login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row style={{ height: "100vh", background: "#eee" }}>
      <Col span={12} offset={6}>
        <Card title="REGISTER" style={{ marginTop: "100px" }}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="acceptTerms" valuePropName="checked">
              <Checkbox>Accept Terms</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export { Register };
