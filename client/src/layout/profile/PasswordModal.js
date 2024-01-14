import { useProfileContext } from 'contexts/profile';
import useOnFetch from 'hooks/useOnFetch';
import api from 'api/api';
import { Form, Input, Modal } from 'antd';

import useLanguage from 'helper/getLabel';

const PasswordModal = () => {
  const translate = useLanguage();

  const { state, profileContextAction } = useProfileContext();
  const { modal } = profileContextAction;
  const { passwordModal } = state;
  const modalTitle = translate('Update Password');

  const [passForm] = Form.useForm();

  const { onFetch } = useOnFetch();

  const handelSubmit = (fieldsValue) => {
    const entity = 'common/password';
    const updateFn = async () => {
      return await api.put({ entity, jsonData: fieldsValue });
    };
    const callback = updateFn();
    onFetch(callback);
    passForm.resetFields();
    modal.close();
  };
  return (
    <Modal
      title={modalTitle}
      open={passwordModal.isOpen}
      onCancel={modal.close}
      okText="Update"
      onOk={() => {
        passForm.submit();
      }}
    >
      <Form form={passForm} layout="vertical" onFinish={handelSubmit}>
        <Form.Item
          label={translate('New Password')}
          name="password"
          rules={[
            {
              required: true,
              message: translate('Please enter New Password'), // Custom error message for required
            },
            {
              min: 8,
              message: translate('New Password must be at least 8 characters'), // Custom error message for length
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={translate('Confirm Password')}
          name="passwordCheck"
          hasFeedback
          rules={[
            {
              required: true,
              message: translate('Please enter Confirm Password'), // Custom error message for required
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(translate("The two passwords that you entered do not match!")) // Custom error message for mismatch
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
