import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteAllItems } from '../../store/list';
import { Button, Modal } from 'antd'
import './List.css';


function BulkDeleteModal({ user, activeItem, deleteAllItems }) {
  const [visiblePutModal, setVisiblePutModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');


  console.log('user is: ', user)

  const showModal = () => {
    setVisiblePutModal(true);
    setModalText('');
  };

  const handleOk = (values) => {
    setModalText('Deleting all items...');
    setConfirmLoading(true);
    deleteAllItems(user.id);
    setTimeout(() => {
      setModalText('');
      setVisiblePutModal(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    setVisiblePutModal(false);
  };


  return (
    <>
      <Button type='danger'
        onClick={showModal}
        id='bulkDeleteButton'
      >
        Bulk Delete
      </Button>
      <Modal
        title="Deleting All Items"
        visible={visiblePutModal}
        onOk={handleOk}
        okText="Delete All"
        okType="danger"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete all items?</p>
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    user: state.auth.user
  }
}

// for firing actions
const mapDispatchToProps = {
  deleteAllItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkDeleteModal);
