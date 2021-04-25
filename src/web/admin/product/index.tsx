import { Button, message, Popconfirm, Space, Table } from "antd";
import { Pagination, PaginationResult } from "@/models";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { productService } from "@/services";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Edit } from "./Edit";
import { AnimationHelper } from "@/helpers";

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const Product = () => {
  const [products, setProducts] = useState<PaginationResult<any> | null>(null);
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    productService.search(page).then((x) => setProducts(x));
  }, []);

  function onEditHandler(item: any) {
    AnimationHelper.scrollToHtmlElement("#productId");
    setProduct(item);
  }

  function onDeleteHandler(id: string) {
    productService.delete(id).then((res) => {
      if (res) {
        message.success("Deleted successfully");
        productService.search(page).then((x) => setProducts(x));
      }
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: true,
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      key: "brandName",
      sorter: true,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (item) => format(new Date(item), "MM/dd/yyyy"),
      sorter: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <Space size="small">
          <FormOutlined onClick={() => onEditHandler(record)} />
          <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => onDeleteHandler(record.id)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined style={{ color: "#ff4d4f" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    const dataFilter: Pagination = {
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
      orderBy: sorter.field,
      orderDirection: sorter.order,
    };
    productService.search(dataFilter).then((x) => setProducts(x));
  }

  function addNewHandler() {
    setProduct({});
    AnimationHelper.scrollToHtmlElement("#productId");
  }

  function onSaveHandler() {
    productService.search(page).then((x) => setProducts(x));
    setProduct(null);
  }

  return (
    <>
      <Button
        type="primary"
        onClick={addNewHandler}
        style={{ marginBottom: "10px", float: "right" }}
      >
        Add new
      </Button>
      <Table
        pagination={{
          pageSize: products?.pageSize,
          total: products?.totalCount,
          showSizeChanger: true,
        }}
        dataSource={products?.items}
        columns={columns}
        onChange={onChange}
      />
      <div id="productId">
        {product && (
          <Edit
            onSaveHandler={onSaveHandler}
            onCancelHandler={() => setProduct(null)}
            selectedItem={product}
          />
        )}
      </div>
    </>
  );
};
export { Product };
