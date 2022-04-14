import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/list';
import { Button, Modal, Form, Input } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './List.css';


// portions of this code are borrowed from antd docs

function BulkAddModal(props) {

  const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [form] = Form.useForm();


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Adding items...');
    // setConfirmLoading(true);
    form.submit();
    setTimeout(() => {
      setModalText('');
      setVisible(false);
      // setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('on finish BULK POST', values)
    const newValues = values.bulkItems.map(item => {
      return { productName: item }
    })
    props.addItem(newValues);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    form.resetFields()
  }, [visible, form])


  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 20 },
  //   },
  // };
  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { span: 20, offset: 4 },
  //   },
  // };


  // // // === === === return is here === === === // // // 
  return (
    <>
      {/* <Button onClick={props.addItem}>Add Item (modal)</Button> */}
      <Button id="postButton" type="primary" onClick={showModal}>
        Bulk Add
      </Button>
      <Modal
        title="Add Items"
        visible={visible}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="bulkAddItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          {/* <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: 'Please add product name' }]}
          >
            <Input />
          </Form.Item> */}

          <Form.List
            name="bulkItems"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error('Please add at least 1 item'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Products:' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please add product name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Product Name" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="solid"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

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

export default connect(null, mapDispatchToProps)(BulkAddModal);
