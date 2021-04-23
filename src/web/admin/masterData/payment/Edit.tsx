import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect } from 'react';
import { paymentMethodService } from '../../../../services';

const validateMessages = {
  required: '${label} is required!',
};

const Edit = ({ selectedItem, onCancelHandler, onSaveHandler }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: selectedItem.name,
      description: selectedItem.description,
    });
  }, [selectedItem, form]);

  const onFinish = ({ name, description }) => {
    if (selectedItem.id) {
      paymentMethodService.update(selectedItem.id, { name, description })
        .then(res => {
          if (res) {
            message.success('Updated successfully!');
            onSaveHandler();
          }
        })

    } else {
      paymentMethodService.create({ name, description })
        .then(res => {
          if (res) {
            message.success('Added successfully!');
            onSaveHandler();
          }
        })
    }
  };

  return (
    <Card title={selectedItem?.id ? 'EDIT PAYMENT METHOD' : 'ADD PAYMENT METHOD'}>
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
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input />
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