import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/list';
import { Button, Modal, Form, Input } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './List.css';


// portions of this code are borrowed from antd docs

function BulkDeleteModal(props) {

  const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [form] = Form.useForm();


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Deleting items...');
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
    console.log('on finish BULK DELETE', values)
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


  return (
    <>
      <Button id="postButton" type="danger" onClick={showModal}>
        Bulk Delete
      </Button>
      <Modal
        title="Delete All Items"
        visible={visible}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="bulkDeleteItem"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >

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

export default connect(null, mapDispatchToProps)(BulkDeleteModal);
