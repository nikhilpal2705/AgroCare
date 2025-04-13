import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/auth/actions";
import Loader from "components/common/Loader";
import { selectAuth } from "../../redux/auth/selectors";
import AuthLayout from "layout/auth/AuthLayout";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import useLanguage from 'helper/getLabel';


const Register = () => {
  const translate = useLanguage();

  const navigate = useNavigate()
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const dispatch = useDispatch();


  async function handleRegister(formData) {
    // If the form is valid, proceed with the registration.
    dispatch(auth.register({ registerData: formData }));
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(auth.resetAction());
      navigate('/login');
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <AuthLayout AUTH_TITLE="Sign Up">
      <Loader isLoading={isLoading}>
        <Form
          layout="vertical"
          name="signup"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleRegister}
        >
          <Form.Item
            name="name"
            label={translate('name')}
            rules={[
              {
                required: true,
                message: 'Please input your Name!',

              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={translate('email')}
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                type: 'email',
                message: 'Invalid email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate('password')}
            rules={[
              {
                required: true,
                message: 'Please input Password!',

              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"
              size="large" />
          </Form.Item>
          <Form.Item style={{ paddingTop: '8px' }}>
            <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button" size="large">
              Register
            </Button>
            Or <Link to="/login">Already have account? Login</Link>
          </Form.Item>
        </Form>
      </Loader>
    </AuthLayout>
  );
};

export default Register;
