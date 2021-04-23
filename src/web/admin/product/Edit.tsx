import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, InputNumber, message, Modal, Row, Select, Upload } from 'antd';
import { FileHelper } from '@/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { brandService, categoryService, productService } from '@/services';
const validateMessages = {
  required: '${label} is required!',
};

const Edit = ({ selectedItem, onCancelHandler, onSaveHandler }) => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [previewTitle, setPreviewTitle] = useState(null);
  const [fileList, setFileList] = useState<Array<any>>([]);

  useEffect(() => {
    brandService.getAll().then(x => setBrands(x));
    categoryService.getAll().then(x => setCategories(x));
  }, []);

  const categorySource = useMemo(() => (categories.map((item: any) => ({ value: item.id, label: item.name }))), [categories]);
  const brandSource = useMemo(() => (brands.map((item: any) => ({ value: item.id, label: item.name }))), [brands]);

  useEffect(() => {
    form.setFieldsValue({
      name: selectedItem.name,
      description: selectedItem.description,
      brandId: selectedItem.brandId,
      categoryId: selectedItem.categoryId,
      price: selectedItem.price,
      countInStock: selectedItem.countInStock,
    });
    FileHelper.dataUrlToFile(selectedItem.image, 'HINH')
      .then(data => {
        const item = { originFileObj: data };
        setFileList([item]);
      }).catch(() => setFileList([]));
  }, [selectedItem, form]);

  const onFinish = async (data) => {
    const image = await FileHelper.getBase64(fileList[0].originFileObj);
    const params = { ...data, image }
    if (selectedItem.id) {
      productService.update(selectedItem.id, params)
        .then(res => {
          if (res) {
            message.success('Updated successfully!');
            onSaveHandler();
          }
        })

    } else {
      productService.create(params)
        .then(res => {
          if (res) {
            message.success('Added successfully!');
            onSaveHandler();
          }
        })
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await FileHelper.getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <Card title={selectedItem?.id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}>
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
              label="Count In Stock"
              name="countInStock"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Please Select"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                options={categorySource}
              >
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Brand"
              name="brandId"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Please Select"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                options={brandSource}
              >
              </Select>
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
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
            >
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
                fileList={fileList}
              >
                {fileList && fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
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