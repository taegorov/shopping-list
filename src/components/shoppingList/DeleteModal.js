import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../../store/list';
import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import './List.css';


// portions of this code are borrowed from antd docs

function DeleteModal({ activeItem, deleteItem }) {
  const [visiblePutModal, setVisiblePutModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');




  const showModal = () => {
    setVisiblePutModal(true);
    setModalText('');
  };

  const handleOk = (values) => {
    setModalText('Deleting item...');
    setConfirmLoading(true);
    deleteItem(activeItem.id);
    setTimeout(() => {
      setVisiblePutModal(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    setVisiblePutModal(false);
  };



  // console.log('ACTIVE ITEM IS: ', activeItem);



  // // // === === === return is here === === === // // // 
  return (
    <>
      <Button type="text" onClick={showModal}>
        <DeleteOutlined style={{ color: 'red' }} />
      </Button>
      <Modal
        title="Deleting Item"
        visible={visiblePutModal}
        onOk={handleOk}
        okText="Delete"
        okType="danger"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete {activeItem.productName}?</p>
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

// for firing actions
const mapDispatchToProps = {
  deleteItem,
}

export default connect(null, mapDispatchToProps)(DeleteModal);
