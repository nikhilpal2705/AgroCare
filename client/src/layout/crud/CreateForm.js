import { useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Button, Form } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import Loader from 'components/common/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '../../redux/crud/actions';
import { selectCreatedItem } from '../../redux/crud/selectors';

export default function CreateForm({ config, formElements, withUpload = false }) {
  const { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, addBox } = crudContextAction;
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    if (withUpload && fieldsValue.file) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    const addObj = Object.fromEntries(
      Object.entries(fieldsValue).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ])
    );
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
        <Form.Item style={{ display: 'inline-block', paddingRight: '5px' }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Submit</Button>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', paddingLeft: '5px' }}>
          <Button onClick={handleCancel} icon={<CloseCircleOutlined />}>Cancel</Button>
        </Form.Item>
      </Form>
    </Loader>
  );
}
