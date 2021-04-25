import { Modal, Table, Typography } from "antd";
import { Pagination } from "@/models";
import React, { useState } from "react";

import NumberFormat from "react-number-format";

const Detail = ({ item, isShow, closeModalHandler }) => {
  const handleClose = () => {
    closeModalHandler();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (item) => <img src={item} width={50} />,
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
      render: (item) => (
        <Typography.Text strong>
          <NumberFormat
            suffix=" đ"
            thousandSeparator
            value={item}
            displayType="text"
          />
        </Typography.Text>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (item, record) => (
        <Typography.Text strong>
          <NumberFormat
            suffix=" đ"
            thousandSeparator
            value={(record.quantity * record.price).toFixed(2)}
            displayType="text"
          />
        </Typography.Text>
      ),
    },
  ];

  return (
    <>
      <Modal
        width={800}
        title="View Details"
        visible={isShow}
        onOk={handleClose}
        okText="Close"
        closable={false}
        cancelButtonProps={{ hidden: true }}
      >
        <Table
          pagination={{
            hideOnSinglePage: true,
          }}
          dataSource={item?.orderDetail}
          columns={columns}
        />
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <p>
            <b>Item price</b>:{" "}
            <NumberFormat
              displayType="text"
              value={item?.itemPrice}
              thousandSeparator
              suffix=" đ"
            />
          </p>
          <p>
            <b>Tax price</b>:{" "}
            <NumberFormat
              displayType="text"
              value={item?.taxPrice}
              thousandSeparator
              suffix=" đ"
            />
          </p>
          <p>
            <b>Shipping price</b>:{" "}
            <NumberFormat
              displayType="text"
              value={item?.shippingPrice}
              thousandSeparator
              suffix=" đ"
            />
          </p>
          <p>
            <b>Total</b>:{" "}
            <NumberFormat
              displayType="text"
              value={item?.totalPrice}
              thousandSeparator
              suffix=" đ"
            />
          </p>
        </div>
      </Modal>
    </>
  );
};
export { Detail };
