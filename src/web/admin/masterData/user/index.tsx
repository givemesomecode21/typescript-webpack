import { Button, message, Popconfirm, Space, Table } from "antd";
import { Pagination, PaginationResult } from "@/models";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { productService, userService } from "@/services";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Edit } from "./Edit";
import { AnimationHelper } from "@/helpers";

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const User = () => {
  const [users, setUsers] = useState<PaginationResult<any> | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    userService.search(page).then((x) => setUsers(x));
  }, []);

  function onEditHandler(item: any) {
    AnimationHelper.scrollToHtmlElement("#userId");
    setUser(item);
  }

  function onDeleteHandler(id: string) {
    userService.delete(id).then((res) => {
      if (res) {
        message.success("Deleted successfully");
        userService.search(page).then((x) => setUsers(x));
      }
    });
  }

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: "Display name",
      dataIndex: "displayName",
      key: "displayName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Inserted At",
      dataIndex: "created",
      key: "created",
      sorter: true,
      render: (item) => format(new Date(item), "MM/dd/yyyy"),
    },
    {
      title: "Updated At",
      dataIndex: "updated",
      key: "updated",
      render: (item) => item ? format(new Date(item), "MM/dd/yyyy") : '',
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <Space size="small">
          <FormOutlined style={{ color: "#1890ff" }} onClick={() => onEditHandler(record)} />
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
    userService.search(dataFilter).then((x) => setUsers(x));
  }

  function addNewHandler() {
    setUser({});
    AnimationHelper.scrollToHtmlElement("#userId");
  }

  function onSaveHandler() {
    userService.search(page).then((x) => setUsers(x));
    setUser(null);
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
          pageSize: users?.pageSize,
          total: users?.totalCount,
          showSizeChanger: true,
        }}
        dataSource={users?.items}
        columns={columns}
        onChange={onChange}
      />
      <div id="userId">
        {user && (
          <Edit
            onSaveHandler={onSaveHandler}
            onCancelHandler={() => setUser(null)}
            selectedItem={user}
          />
        )}
      </div>
    </>
  );
};
export { User };
