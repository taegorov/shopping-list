import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom'
import { Table, Space, Card, Avatar, Checkbox, Switch, Modal } from 'antd';
// import { CheckSquareOutlined } from '@ant-design/icons';
import { loadList, updateItem } from '../../store/list';
// import { isAuthenticated, user } from '../../store/auth';
import PostModal from "./PostModal";
import BulkAddModal from "./BulkAddModal";
import BulkDeleteModal from "./BulkDeleteModal";
import PutModal from "./PutModal";
import DeleteModal from "./DeleteModal";
import './List.css';


function List({ loadList, listItems, isAuthenticated, user, updateItem, activeItem }) {

  const [hide, setHide] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [shownItem, setShownItem] = useState('');
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('');
  // const [form] = Form.useForm();


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


  const showModal = (e, singleItem) => {
    setVisibleModal(true);
    setShownItem(singleItem)
    // console.log('modal opened!')
  };

  // const handleOk = () => {
  //   setModalText('Updating item...');
  //   setConfirmLoading(true);
  //   form.submit();
  //   setTimeout(() => {
  //     setModalText('');
  //     setVisibleModal(false);
  //     setConfirmLoading(false);
  //   }, 1000);
  // };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  // const onFinish = (values) => {
  //   console.log('on finish UPDATE:', values, activeItem.id)
  //   updateItem(values, activeItem.id);
  // }

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  // const title = `Update ${activeItem.productName}`



  return (
    <Media query="(max-width: 480px)">
      {(matches) =>
        matches ? (
          <>
            <div id="buttonContainer">
              <PostModal />
              <BulkAddModal />
              <BulkDeleteModal />
              <div id="switchContainer">
                <Switch id="completedSwitch" onChange={handleHide} />
                <p>Hide Completed</p>
              </div>
            </div>

            <div>

              <Modal
                title={shownItem.productName}
                // title="hi"
                visible={visibleModal}
                // onOk={handleOk}
                // okText="Ok"
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
              >
                <p>Aisle: {shownItem.aisle} </p>
                <p>Quantity: {shownItem.quantity} </p>
                <p>Category: {shownItem.category} </p>
                <p>Price: ${shownItem.price} </p>
                <div style={{ textAlign: 'center' }}>
                  <img src={shownItem.image} alt={shownItem.productName} style={{ maxWidth: '100%', maxHeight: '200px', }} />
                </div>
                {/* <p>Completed: {String(shownItem.completed)} </p> */}
                <p>Notes: {shownItem.notes}</p>
              </Modal>


              {listItems.map(singleItem => {
                if (hide === false || singleItem.completed === false) {
                  // console.log('single item: ', singleItem)
                  return (
                    <>
                      <Card
                        className="singleItem"
                        hoverable
                        key={singleItem.id}
                        actions={[
                          <Checkbox
                            checked={singleItem.completed}
                            onChange={e => onChecked(e, singleItem)}
                          />,
                          <PutModal activeItem={singleItem} />,
                          <DeleteModal activeItem={singleItem} />,
                        ]}
                      // description="This is the description"
                      >
                        <Meta
                          onClick={(e) => showModal(e, singleItem)}
                          // onClick={showModal}
                          title={singleItem.productName}
                          avatar={singleItem.image ? <Avatar size={50} src={singleItem.image} /> : <svg xmlns="http://www.w3.org/2000/svg" style={{ height: 50 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>}
                          description={`Completed: ${String(singleItem.completed)}`}
                        />
                        {/* <p> {singleItem.notes} </p> */}
                      </Card>

                    </>
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
    </Media >

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
