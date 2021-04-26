import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, InputNumber, message, Modal, Row, Select, Upload } from 'antd';
import { FileHelper } from '@/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { brandService, categoryService, productService, userService } from '@/services';
const validateMessages = {
  required: '${label} is required!',
};

const Edit = ({ selectedItem, onCancelHandler, onSaveHandler }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      lastName: selectedItem.lastName,
      firstName: selectedItem.firstName,
      displayName: selectedItem.displayName,
      email: selectedItem.email,
      role: selectedItem.role.toString(),
    });
  }, [selectedItem, form]);

  const onFinish = async (data) => {
    const params = { ...data }
    if (selectedItem.id) {
      userService.update(selectedItem.id, params)
        .then(res => {
          if (res) {
            message.success('Updated successfully!');
            onSaveHandler();
          }
        })

    } else {
      userService.create(params)
        .then(res => {
          if (res) {
            message.success('Added successfully!');
            onSaveHandler();
          }
        })
    }
  };

  return (
    <Card title={selectedItem?.id ? 'EDIT USER' : 'ADD USER'}>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col span={12}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Display name"
              name="displayName"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
            >
              <Select>
                <Select.Option value="0">Admin</Select.Option>
                <Select.Option value="1">User</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={onCancelHandler} type="default" style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )

}

export { Edit }