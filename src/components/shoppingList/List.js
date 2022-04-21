import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom'
import { Table, Space, Card, Avatar, Checkbox, Switch } from 'antd';
// import { CheckSquareOutlined } from '@ant-design/icons';
import { loadList, updateItem } from '../../store/list';
// import { isAuthenticated, user } from '../../store/auth';
import PostModal from "./PostModal";
import BulkAddModal from "./BulkAddModal";
import PutModal from "./PutModal";
import DeleteModal from "./DeleteModal";
import './List.css';


function List({ loadList, listItems, isAuthenticated, user, updateItem, activeItem }) {

  const [hide, setHide] = useState(false);

  function handleHide() {
    setHide(!hide);
  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      // render: text => <a href>{text}</a>,
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

  const navigate = useNavigate();

  useEffect(() => {
    loadList();
    if (isAuthenticated === false) {
      navigate("/")
    }
  }, [loadList, isAuthenticated, navigate])

  // allows adding Avatar to Card (from antd docs)
  const { Meta } = Card;

  console.log('is authenticated: ', isAuthenticated)
  console.log('user: ', user)


  const onChecked = (e, singleItem) => {
    const activeItemCopy = { ...singleItem };
    activeItemCopy.completed = e.target.checked;
    console.log('active item copy, its id: ', activeItemCopy, activeItemCopy.id);
    updateItem(activeItemCopy, activeItemCopy.id)
  }

  // // // === === === === === === === === === === // // //
  // // // === === === return is here === === === // // // 
  // // // === === === === === === === === === === // // //
  return (
    <Media query="(max-width: 480px)">
      {(matches) =>
        matches ? (
          <>
            <div id="buttonContainer">
              <PostModal />
              <BulkAddModal />
              <div id="switchContainer">
                <Switch id="completedSwitch" onChange={handleHide} />
                <p>Hide Completed</p>
              </div>
            </div>

            <div>
              {listItems.map(singleItem => {
                if (hide === false || singleItem.completed === false) {
                  // console.log('single item: ', singleItem)
                  return (
                    <Card
                      className="singleItem"
                      key={singleItem.id}
                      actions={[
                        <Checkbox
                          checked={singleItem.completed}
                          onChange={e => onChecked(e, singleItem)}
                        />,
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
                      <p> {singleItem.notes} </p>
                      <p>Completed: {String(singleItem.completed)} </p>
                      <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} />
                    </Card>
                  )
                } else {
                  return null
                }
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
  console.log(state)
  return {
    listItems: state.shoppingList.shoppingList,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

// for firing actions
const mapDispatchToProps = {
  loadList,
  updateItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
