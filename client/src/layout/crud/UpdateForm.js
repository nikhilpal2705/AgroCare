import { useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Button, Form } from 'antd';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;

  const { crudContextAction } = useCrudContext();
  const { panel, editBox } = crudContextAction;
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    // const id = current.id;

    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    const updateObj = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});

    // API to update
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     editBox.close();
  //     panel.close();
  //     form.resetFields();
  //     // API to get new list
  //   }
  // }, [isSuccess]);

  const handleCancel = () => {
    panel.close();
    editBox.close();
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      {formElements}
      <Form.Item
        style={{
          display: 'inline-block',
          paddingRight: '5px',
        }}
      >
        <Button type="primary" htmlType="submit">
          {'Save'}
        </Button>
      </Form.Item>
      <Form.Item
        style={{
          display: 'inline-block',
          paddingLeft: '5px',
        }}
      >
        <Button onClick={handleCancel}>{'Cancel'}</Button>
      </Form.Item>
    </Form>
  );
}
