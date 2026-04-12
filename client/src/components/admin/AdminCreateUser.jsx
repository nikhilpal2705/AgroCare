import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Drawer,
  message,
  Select,
  Divider,
  Alert,
  Space
} from 'antd';
import { PlusOutlined, LockOutlined, MailOutlined, UserOutlined, CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { selectAuth } from 'redux/auth/selectors';
import api from 'api/api';
import { ADMIN_BASE_URL } from 'api/config';

/**
 * Component to create new admin users
 * Only accessible by existing admin users
 * Calls: POST /admin/manage/admins (internal endpoint)
 */
const AdminCreateUser = () => {
  const { isAdmin } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return null;
  }

  const showDrawer = () => {
    form.resetFields();
    setIsDrawerOpen(true);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    form.resetFields();
  };

  const validatePassword = (_, value) => {
    if (!value) return Promise.reject(new Error('Password required'));
    if (value.length < 8) return Promise.reject(new Error('Min 8 characters'));
    if (!/[A-Z]/.test(value)) return Promise.reject(new Error('Need uppercase'));
    if (!/[a-z]/.test(value)) return Promise.reject(new Error('Need lowercase'));
    if (!/[0-9]/.test(value)) return Promise.reject(new Error('Need number'));
    if (!/[!@#$%^&*]/.test(value)) return Promise.reject(new Error('Need special char (!@#$%^&*)'));
    return Promise.resolve();
  };

  const validatePasswordMatch = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('Passwords do not match'));
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await api.post({
        entity: ADMIN_BASE_URL + 'manage/admins',
        jsonData: {
          name: values.name,
          email: values.email,
          password: values.password,
          preferredLanguage: values.preferredLanguage || 'en'
        }
      });

      if (response.success) {
        message.success('Admin user created successfully!');
        setIsDrawerOpen(false);
        form.resetFields();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        message.error(response.message || 'Failed to create admin');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Error creating admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showDrawer}
      >
        Add New Admin
      </Button>

      <Drawer
        title={
          <span>Add New Admin User</span>
        }
        placement="right"
        width={450}
        open={isDrawerOpen}
        onClose={handleCancel}
        destroyOnClose
        footer={(
          <div className="crud-form-footer">
            <Button onClick={handleCancel} disabled={loading} icon={<CloseCircleOutlined />}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()} loading={loading} icon={<SaveOutlined />}>Submit</Button>
          </div>
        )}
      >
        <div className="sidePanelContent">
          <Alert
            message="Security Notice"
            description="Only existing admins can create new admin accounts. Strong passwords required."
            type="info"
            style={{ marginBottom: '20px' }}
          />

          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: 'Enter admin name' },
                { min: 3, message: 'Min 3 characters' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="John Administrator" size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Enter email' },
                { type: 'email', message: 'Invalid email' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="admin@example.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Min 8 chars: uppercase, lowercase, number, special"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ validator: validatePasswordMatch }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Re-enter password" size="large" />
            </Form.Item>

            <Form.Item label="Language" name="preferredLanguage" initialValue="en">
              <Select>
                <Select.Option value="en">English</Select.Option>
              </Select>
            </Form.Item>

            <Divider />

            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '15px',
              padding: '10px',
              background: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <strong>Password Requirements:</strong>
              <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                <li>At least 8 characters</li>
                <li>Uppercase letter</li>
                <li>Lowercase letter</li>
                <li>Number</li>
                <li>Special character (!@#$%^&*)</li>
              </ul>
            </div>

          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default AdminCreateUser;
