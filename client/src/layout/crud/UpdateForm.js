import { useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '../../redux/crud/actions';
import { selectUpdatedItem } from '../../redux/crud/selectors';
import Loader from 'components/common/Loader';
import dayjs from 'dayjs';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  const { entity } = config;

  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, editBox } = crudContextAction;
  const [form] = Form.useForm();

  useEffect(() => {
    const handleDateFormats = (newValues) => {
      const dateFields = ['plantingDate', 'harvestDate', 'date'];
      const dateFormat = dateFields.reduce((acc, field) => {
        if (newValues[field]) {
          acc[field] = dayjs(newValues[field]).format('DD-MM-YYYY');
          delete newValues[field];
        }
        return acc;
      }, {});
      return { ...newValues, ...dateFormat };
    };

    if (current) {
      let newValues = handleDateFormats({ ...current });
      delete newValues['updatedAt'];
      delete newValues['createdAt'];
      
      form.resetFields();
      form.setFieldsValue(newValues);
    }
  }, [current]);

  const onSubmit = (fieldsValue) => {
    if (withUpload && fieldsValue.file) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    const updateObj = Object.fromEntries(
      Object.entries(fieldsValue).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ])
    );

    dispatch(crud.update({ entity, id: current.id, jsonData: updateObj, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      editBox.close();
      panel.close();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const handleCancel = () => {
    panel.close();
    editBox.close();
    form.resetFields();
  };

  return (
    <Loader isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {formElements}
        <Form.Item style={{ display: 'inline-block', paddingRight: '5px' }}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', paddingLeft: '5px' }}>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </Loader>
  );
}
