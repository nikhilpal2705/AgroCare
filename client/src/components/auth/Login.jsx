import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/selectors';
import { auth } from '../../redux/auth/actions';
import Loader from 'components/common/Loader';
import { Form, Button, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useLanguage from 'helper/getLabel';
import AuthLayout from 'layout/auth/AuthLayout';

const Login = () => {
    const translate = useLanguage();
    const navigate = useNavigate()
    const { isLoading, isSuccess } = useSelector(selectAuth);
    const dispatch = useDispatch();


    async function handleLogin(formData) {
        dispatch(auth.login({ loginData: formData }));
    }

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    return (
        <AuthLayout AUTH_TITLE="Sign In">
            <Loader isLoading={isLoading}>
                <Form
                    layout="vertical"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                >

                    <Form.Item
                        label={translate('email')}
                        name="email"
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
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={'Email'}
                            type="email"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label={translate('password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',

                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder={'Password'}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>{translate('Remember me')}</Checkbox>
                        </Form.Item>

                        {/* <Link to="/forgetpassword" className="login-form-forgot" style={{ marginLeft: '0px' }}>{translate('Forgot password')}</Link> */}
                    </Form.Item>


                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={isLoading}
                            size="large"
                        >
                            Log in
                        </Button>
                        Or <Link to="/register">Register Now!</Link>
                    </Form.Item>
                </Form>
            </Loader>
        </AuthLayout>
    );
};

export default Login;
