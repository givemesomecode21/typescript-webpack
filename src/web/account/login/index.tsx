import React from "react";
import { Form, Button, Input, Row, Col, Checkbox, Card } from "antd";
import { userService } from "./../../../services";

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const Login = ({ history, location }) => {

  const onFinish = ({ email, password }) => {
    userService.login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ height: "100vh", background: "#eee" }}>
      <Col span={6} offset={9} >
        <Card title="LOGIN" style={{ marginTop: "100px" }}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }, { type: 'email' }]}
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
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
}
export { Login }