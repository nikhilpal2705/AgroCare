import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row, Form, Input, Select } from 'antd';

import { auth } from '../../redux/auth/actions';
import { selectCurrentUser } from '../../redux/auth/selectors';
import useLanguage from 'helper/getLabel';
import { useProfileContext } from 'contexts/profile';
import { COMMON_BASE_URL } from 'api/config';

const UpdateProfile = ({ config }) => {
  const translate = useLanguage();
  const { profileContextAction } = useProfileContext();
  const { updatePanel } = profileContextAction;
  const dispatch = useDispatch();
  const { ENTITY_NAME } = config;
  const entity = COMMON_BASE_URL + "profile";

  const currentUser = useSelector(selectCurrentUser);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser, form]);

  const handleSubmit = () => {
    form.submit();
  };

  const onSubmit = (fieldsValue) => {
    if (fieldsValue.file) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});

    dispatch(auth.updateProfile({ entity, jsonData: trimmedValues }));
  };

  return (
    <>
      <div className="profile-card profile-form-shell">
        <div className="profile-form-header">
          <div>
            <h1>{ENTITY_NAME}</h1>
            <p>Update your profile details with the latest information.</p>
          </div>
        </div>

        <Row align="start">
          <Col xs={{ span: 24 }}>
          <Form
            form={form}
            onFinish={onSubmit}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="profile-edit-form"
          >
            <Form.Item
              label={translate('Name')}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              label={translate('email')}
              name="email"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'email',
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              label="Preferred Language"
              name="preferredLanguage"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: 'English', value: 'en' },
                ]}
              />
            </Form.Item>
            <div className="profile-form-actions">
              <Button onClick={() => updatePanel.close()} icon={<CloseCircleOutlined />}>
                {translate('Close')}
              </Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                {translate('Save')}
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UpdateProfile;
