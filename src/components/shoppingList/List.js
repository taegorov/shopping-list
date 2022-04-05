import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Table, Space } from 'antd';
import Media from 'react-media';
import { loadList, updateItem } from '../../store/list';
import PostModal from "./PostModal";
import PutModal from "./PutModal";
import DeleteModal from "./DeleteModal";
import './List.css';


function List({ loadList, listItems }) {

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: text => <a href>{text}</a>,
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
            <DeleteModal activeItem={record} />
          </Space>
        </>
      )
    }
  ];


  useEffect(() => {
    loadList();
  }, [loadList])


  // // // === === === return is here === === === // // // 
  return (

    <Media query="(max-width: 599px)">
      {(matches) =>
        matches ? (
          <>
            <div>
              {listItems.map(singleItem => {
                console.log('single item: ', singleItem)
                return (
                  <div className="singleItem">
                    <p>Name: {singleItem.productName} </p>
                    <p>Quantity: {singleItem.quantity} </p>
                    <p>Category: {singleItem.category} </p>
                    <p>Price: ${singleItem.price} </p>
                    <p>Notes: {singleItem.notes} </p>
                    <p>{singleItem.image} </p>
                    <p>Aisle: {singleItem.aisle} </p>
                  </div>
                )
              })
              }
            </div>
          </>
        ) : (
          <>
            <PostModal />
            <Table
              className="table"
              dataSource={listItems}
              columns={columns}
              rowSelection
            />
          </>
        )
      }
    </Media>

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
