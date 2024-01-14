import { generate as uniqueId } from 'shortid';
import { EditOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Descriptions, Divider, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useNavigate } from 'react-router-dom';
import useLanguage from 'helper/getLabel';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/selectors';
import { useProfileContext } from 'contexts/profile';

const ViewProfile = ({ config }) => {
  const translate = useLanguage();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { profileContextAction } = useProfileContext();
  const { modal, updatePanel } = profileContextAction;
  const { ENTITY_NAME } = config;

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={ENTITY_NAME}
        ghost={false}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              updatePanel.open();
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            icon={<LockOutlined />}
            onClick={() => {
              modal.open();
            }}
          >
            {translate('Update Password')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Row align="middle">
        <Col xs={{ span: 24 }} sm={{ span: 7 }} md={{ span: 5 }}>
          <Avatar
            className="last left pad5"
            // src={srcImgProfile}
            size={96}
            style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: '48px' }}
            alt={`${currentUser?.name}`}
          >
            {currentUser?.name.charAt(0).toUpperCase()}
          </Avatar>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 18 }}>
          <Descriptions column={1} size="middle">
            <Descriptions.Item label={translate('name')}>
              {currentUser?.name}
            </Descriptions.Item>
            <Descriptions.Item label={translate('email')}>{currentUser?.email}</Descriptions.Item>
            <Descriptions.Item label={translate('role')}>{currentUser?.authority}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Button
        key={`${uniqueId()}`}
        icon={<LogoutOutlined />}
        className="right"
        onClick={() => navigate('/logout')}
      >
        {translate('Logout')}
      </Button>
    </>
  );
};
export default ViewProfile;
