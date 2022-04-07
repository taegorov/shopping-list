import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/list';
import { Button, Modal, Form, Input, InputNumber } from 'antd'
import './List.css';


// portions of this code are borrowed from antd docs

function PostModal(props) {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [form] = Form.useForm();


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Adding item...');
    setConfirmLoading(true);
    form.submit();
    setTimeout(() => {
      setModalText('');
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('on finish POST', values)
    props.addItem(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    form.setFieldsValue('')
  }, [visible, form])


  // // // === === === return is here === === === // // // 
  return (
    <>
      {/* <Button onClick={props.addItem}>Add Item (modal)</Button> */}
      <Button id="postButton" type="primary" onClick={showModal}>
        Add Item
      </Button>
      <Modal
        title="Add Item"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="addItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: 'Please add product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: false }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: false }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Aisle"
            name="aisle"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>


          {/* <Form.Item>
            <Button type="primary" htmlType="submit" onSubmit={props.addItem} >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="danger" htmlType="submit" onSubmit={handleCancel}>
              Cancel
            </Button>
          </Form.Item> */}
        </Form>
        <p>{modalText}</p>

      </Modal>
    </>
  )
}

// for firing actions
const mapDispatchToProps = {
  addItem,
}

export default connect(null, mapDispatchToProps)(PostModal);
