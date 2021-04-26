import {
  Button,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { Pagination, PaginationResult } from "@/models";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { orderService } from "@/services";
import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { Detail } from "./Detail";

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const Order = () => {
  const [orders, setOrders] = useState<PaginationResult<any> | null>(null);
  const [itemsDetails, setItemsDetails] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    orderService.search(page).then((x) => setOrders(x));
  }, []);

  const onDeleteHandler = (id: string) => {
    orderService.delete(id).then((res) => {
      if (res) {
        message.success("Deleted successfully");
        orderService.search(page).then((x) => setOrders(x));
      }
    });
  };

  const changeStatusHandler = (id, object) => {
    const params = { id, ...object };
    orderService.changeStatus(params).then((res) => {
      if (res) {
        message.success("Updated successfully");
        orderService.search(page).then((x) => setOrders(x));
      }
    });
  };

  const columns = [
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: true,
    },
    {
      title: "Inserted By",
      dataIndex: "insertedBy",
      key: "insertedBy",
      sorter: true,
    },
    {
      title: "Inserted At",
      dataIndex: "insertedAt",
      key: "insertedAt",
      render: (item) => format(new Date(item), "MM/dd/yyyy HH:mm:ss"),
      sorter: true,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: true,
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
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (item) => format(new Date(item), "MM/dd/yyyy HH:mm:ss"),
      sorter: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      sorter: true,
    },
    {
      title: "Delivered",
      dataIndex: "isDelivered",
      key: "isDelivered",
      sorter: true,
      render: (item, record: any) =>
        item ? (
          <Tooltip title="Click to change status">
            <CheckSquareOutlined
              onClick={() =>
                changeStatusHandler(record.id, { isDelivered: false })
              }
              style={{ color: "#52c41a" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Click to change status">
            <CloseSquareOutlined
              onClick={() =>
                changeStatusHandler(record.id, { isDelivered: true })
              }
              style={{ color: "#ff4d4f" }}
            />
          </Tooltip>
        ),
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      sorter: true,
      render: (item, record: any) =>
        item ? (
          <Tooltip title="Click to change status">
            <CheckSquareOutlined
              onClick={() => changeStatusHandler(record.id, { isPaid: false })}
              style={{ color: "#52c41a" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Click to change status">
            <CloseSquareOutlined
              onClick={() => changeStatusHandler(record.id, { isPaid: true })}
              style={{ color: "#ff4d4f" }}
            />
          </Tooltip>
        ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record: any) => (
        <Space size="small">
          <Tooltip title="Click to view details">
            <EyeOutlined style={{ color: "#1890ff" }} onClick={() => showModal(record)} />
          </Tooltip>
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
    orderService.search(dataFilter).then((x) => setOrders(x));
  }

  const showModal = (data) => {
    setIsShowDetail(true);
    setItemsDetails(data);
  };

  return (
    <>
      <Table
        pagination={{
          pageSize: orders?.pageSize,
          total: orders?.totalCount,
          showSizeChanger: true,
        }}
        dataSource={orders?.items}
        columns={columns}
        onChange={onChange}
      />
      <Detail
        isShow={isShowDetail}
        closeModalHandler={() => setIsShowDetail(false)}
        item={itemsDetails}
      />
    </>
  );
};
export { Order };
