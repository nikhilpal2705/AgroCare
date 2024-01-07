import { useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '../../redux/crud/actions';
import { selectCreatedItem } from '../../redux/crud/selectors';
import Loader from 'components/common/Loader';


export default function CreateForm({ config, formElements, withUpload = false }) {
  const { entity } = config
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, addBox } = crudContextAction;
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
    dispatch(crud.create({ entity, jsonData: addObj, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      addBox.close();
      panel.close();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const handleCancel = () => {
    panel.close();
    addBox.close();
    form.resetFields();
  };

  return (
    <Loader isLoading={isLoading}>
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
    </Loader>
  );
}
