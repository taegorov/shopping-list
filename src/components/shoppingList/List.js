import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Media from 'react-media';
import { Table, Space, Card, Avatar } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
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

  // allows adding Avatar to Card (from antd docs)
  const { Meta } = Card;



  // // // === === === === === === === === === === // // //
  // // // === === === return is here === === === // // // 
  return (
    <Media query="(max-width: 480px)">
      {(matches) =>
        matches ? (
          <>
            <PostModal />
            <div>
              {listItems.map(singleItem => {
                // console.log('single item: ', singleItem)
                return (
                  <Card
                    className="singleItem"
                    actions={[
                      <CheckSquareOutlined key="check" />,
                      <PutModal activeItem={singleItem} />,
                      <DeleteModal activeItem={singleItem} />,
                    ]}
                    title={singleItem.productName}
                  // description="This is the description"
                  >
                    {/* <p>Aisle: {singleItem.aisle} </p>
                    <p>Quantity: {singleItem.quantity} </p>
                    <p>Category: {singleItem.category} </p>
                    <p>Price: ${singleItem.price} </p>
                    <p>{singleItem.image} </p> */}
                    <p>{singleItem.notes} </p>
                    <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} />
                  </Card>
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
