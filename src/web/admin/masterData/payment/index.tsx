import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Pagination, PaginationResult } from 'models';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { paymentMethodService } from '../../../../services';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Edit } from './Edit';
import { AnimationHelper } from '../../../../helpers';

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const Payment = () => {

  const [payments, setPayments] = useState<PaginationResult<any> | null>(null);
  const [payment, setPayment] = useState<any | null>(null);

  useEffect(() => {
    paymentMethodService.search(page).then(x => setPayments(x));
  }, []);

  function onEditHandler(item: any) {
    AnimationHelper.scrollToHtmlElement("#paymentId");
    setPayment(item);
  }

  function onDeleteHandler(id: string) {
    paymentMethodService.delete(id)
      .then(res => {
        if (res) {
          message.success('Deleted successfully');
          paymentMethodService.search(page).then(x => setPayments(x));
        }
      })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (item) => format(new Date(item), 'MM/dd/yyyy'),
      sorter: true
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <Space size="small">
          <a onClick={() => onEditHandler(record)} >Edit</a>
          <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => onDeleteHandler(record.id)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <a href="#">Delete</a>
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
    }
    paymentMethodService.search(dataFilter).then(x => setPayments(x));
  }

  function addNewHandler() {
    setPayment({});
    AnimationHelper.scrollToHtmlElement("#paymentId");
  }

  function onSaveHandler() {
    paymentMethodService.search(page).then(x => setPayments(x));
    setPayment(null);
  }

  return (
    <>
      <Button type="primary" onClick={addNewHandler} style={{ marginBottom: "10px", float: "right" }}>Add new</Button>
      <Table pagination={{ pageSize: payments?.pageSize, total: payments?.totalCount, showSizeChanger: true }} dataSource={payments?.items} columns={columns} onChange={onChange} />
      <div id="paymentId">
        {payment && <Edit onSaveHandler={onSaveHandler} onCancelHandler={() => setPayment(null)} selectedItem={payment} />}
      </div>
    </>
  )
}
export { Payment }