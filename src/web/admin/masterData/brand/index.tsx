import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Pagination, PaginationResult } from 'models';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { brandService } from './../../../../services';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Edit } from './Edit';
import { AnimationHelper } from '../../../../helpers';

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const Brand = () => {
  const [brands, setBrands] = useState<PaginationResult<any> | null>(null);
  const [brand, setBrand] = useState<any | null>(null);

  useEffect(() => {
    brandService.search(page).then(x => setBrands(x));
  }, []);

  function onEditHandler(item: any) {
    AnimationHelper.scrollToHtmlElement("#brandId");
    setBrand(item);
  }

  function onDeleteHandler(id: string) {
    brandService.delete(id)
      .then(res => {
        if (res) {
          message.success('Deleted successfully');
          brandService.search(page).then(x => setBrands(x));
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
    brandService.search(dataFilter).then(x => setBrands(x));
  }

  function addNewHandler() {
    setBrand({});
    AnimationHelper.scrollToHtmlElement("#brandId");
  }

  function onSaveHandler() {
    brandService.search(page).then(x => setBrands(x));
    setBrand(null);
  }

  return (
    <>
      <Button type="primary" onClick={addNewHandler} style={{ marginBottom: "10px", float: "right" }}>Add new</Button>
      <Table pagination={{ pageSize: brands?.pageSize, total: brands?.totalCount, showSizeChanger: true }} dataSource={brands?.items} columns={columns} onChange={onChange} />
      <div id="brandId">
        {brand && <Edit onSaveHandler={onSaveHandler} onCancelHandler={() => setBrand(null)} selectedItem={brand} />}
      </div>
    </>
  )
}
export { Brand }