import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Pagination, PaginationResult } from 'models';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { categoryService } from '../../../../services';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Edit } from './Edit';
import { AnimationHelper } from '../../../../helpers';

const page: Pagination = { pageSize: 10, pageNumber: 1 };

const Category = () => {

  const [categories, setCategories] = useState<PaginationResult<any> | null>(null);
  const [category, setCategory] = useState<any | null>(null);

  useEffect(() => {
    categoryService.search(page).then(x => setCategories(x));
  }, []);

  function onEditHandler(item: any) {
    AnimationHelper.scrollToHtmlElement("#categoryId");
    setCategory(item);
  }

  function onDeleteHandler(id: string) {
    categoryService.delete(id)
      .then(res => {
        if (res) {
          message.success('Deleted successfully');
          categoryService.search(page).then(x => setCategories(x));
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
    categoryService.search(dataFilter).then(x => setCategories(x));
  }

  function addNewHandler() {
    setCategory({});
    AnimationHelper.scrollToHtmlElement("#categoryId");
  }

  function onSaveHandler() {
    categoryService.search(page).then(x => setCategories(x));
    setCategory(null);
  }

  return (
    <>
      <Button type="primary" onClick={addNewHandler} style={{ marginBottom: "10px", float: "right" }}>Add new</Button>
      <Table pagination={{ pageSize: categories?.pageSize, total: categories?.totalCount, showSizeChanger: true }} dataSource={categories?.items} columns={columns} onChange={onChange} />
      <div id="categoryId">
        {category && <Edit onSaveHandler={onSaveHandler} onCancelHandler={() => setCategory(null)} selectedItem={category} />}
      </div>
    </>
  )
}
export { Category }