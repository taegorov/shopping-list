import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../../store/list';
import { Button, Modal, Form, Input, InputNumber } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import './List.css';



// portions of this code are borrowed from antd docs

function PutModal({ activeItem, updateItem }) {
  const [visiblePutModal, setVisiblePutModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    // window.scrollTo(0, 0)
    form.setFieldsValue(activeItem)
  }, [visiblePutModal, activeItem, form])


  const showModal = () => {
    setVisiblePutModal(true);
  };

  const handleOk = () => {
    setModalText('Updating item...');
    setConfirmLoading(true);
    form.submit();
    setTimeout(() => {
      setModalText('');
      setVisiblePutModal(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    setVisiblePutModal(false);
  };

  const onFinish = (values) => {
    console.log('on finish UPDATE:', values, activeItem.id)
    updateItem(values, activeItem.id);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // console.log('ACTIVE ITEM IS: ', activeItem);

  const title = `Update ${activeItem.productName}`


  // // // === === === return is here === === === // // // 
  return (
    <>
      <Button type="text" onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title={title}
        visible={visiblePutModal}
        onOk={handleOk}
        okText="Save"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      // footer={null}
      >
        <Form
          name="updateItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          // initialValues={activeItem}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            // initialValue={activeItem.productName}
            rules={[{ required: true, message: 'Please add product name' }]}

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: false }]}
          // initialValue={activeItem.quantity}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: false }]}
          // initialValue={activeItem.category}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: false }]}
          // initialValue={activeItem.price}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: false }]}
          // initialValue={activeItem.notes}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Aisle"
            name="aisle"
            rules={[{ required: false }]}
          // initialValue={activeItem.aisle}
          >
            <Input />
          </Form.Item>
        </Form>
        <p>{modalText}</p>

      </Modal>
    </>
  )
}

// for firing actions
const mapDispatchToProps = {
  updateItem,
}

export default connect(null, mapDispatchToProps)(PutModal);
