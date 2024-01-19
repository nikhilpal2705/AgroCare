import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generate as uniqueId } from 'shortid';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row, Form, Input } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

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
      <PageHeader
        onBack={() => updatePanel.close()}
        title={ENTITY_NAME}
        ghost={false}
        extra={[
          <Button
            onClick={() => updatePanel.close()}
            key={uniqueId()}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={uniqueId()}
            onClick={() => {
              handleSubmit();
              updatePanel.close();
            }}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
          >
            {translate('Save')}
          </Button>,
        ]}
        style={{
          padding: '20px 0',
        }}
      />
      <Row align="start">
        <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 4 }}></Col>
        <Col xs={{ span: 16 }}>
          <Form
            form={form}
            onFinish={onSubmit}
            labelAlign="left"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
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
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
