import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { loadList, updateItem } from '../../store/list';
import PostModal from "./PostModal";
import PutModal from "./PutModal";
import './List.css';


function List({ loadList, listItems }) {

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes'
    },
    {
      title: 'Aisle',
      dataIndex: 'aisle',
      key: 'aisle'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => (
        <>
          <Space size="middle">
            <PutModal activeItem={record} />
            <Button>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Space>
        </>
      )

    }
  ];


  // technically not working cause no modal pops up, but pretty sure this is how it's done?
  // const onEditItem = (record) => {
  //   setIsEditing(true);
  //   setEditingItem({ ...record });
  // };


  useEffect(() => {
    loadList();
  }, [loadList])


  // // // === === === return is here === === === // // // 
  return (
    <div>
      <PostModal />
      <Table
        className="singleItem"
        dataSource={listItems}
        columns={columns}
        rowSelection
      />
    </div>
  )
}


// for rendering in the dom
// map redux state to component props
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    listItems: state.shoppingList.shoppingList
  }
}

// for firing actions
const mapDispatchToProps = {
  loadList,
  updateItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
