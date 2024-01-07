import { useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Button, Form } from 'antd';
import api from 'api/api';

export default function CreateForm({ config, formElements, withUpload = false }) {
  const { crudContextAction } = useCrudContext();
  const { panel, addBox } = crudContextAction;
  const { routeEntity } = config
  const [form] = Form.useForm();
  const onSubmit = (fieldsValue) => {
    // Trim values before submission

    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    const addObj = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});
    let data = api.create({ entity: routeEntity, jsonData: addObj, withUpload })
    console.log(`😱 😓 😒 ~ file: CreateForm.js:23 ~ onSubmit ~ data:`, data)
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     addBox.close();
  //     panel.close();
  //     form.resetFields();
  //     // API to get new list
  //   }
  // }, [isSuccess]);

  const handleCancel = () => {
    panel.close();
    addBox.close();
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
          {'Submit'}
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
