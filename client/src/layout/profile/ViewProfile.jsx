import { generate as uniqueId } from 'shortid';
import { EditOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
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
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-heading">
            <h1>{ENTITY_NAME}</h1>
            <p>Review your account details and manage access from one place.</p>
          </div>
          <div className="profile-actions">
            <Button
              key={`${uniqueId()}`}
              onClick={() => {
                updatePanel.open();
              }}
              type="primary"
              icon={<EditOutlined />}
            >
              {translate('Edit')}
            </Button>
            <Button
              key={`${uniqueId()}`}
              icon={<LockOutlined />}
              onClick={() => {
                modal.open();
              }}
            >
              {translate('Update Password')}
            </Button>
          </div>
        </div>

        <div className="profile-card-body">
          <div className="profile-hero">
            <Avatar
              className="profile-avatar"
              size={108}
              alt={`${currentUser?.name}`}
            >
              {currentUser?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <div className="profile-meta">
              <div className="profile-meta-top">
                <h2 className="profile-title">{currentUser?.name}</h2>
                <span className="profile-role-tag">{currentUser?.authority}</span>
              </div>

              <div className="profile-detail-grid">
                <div className="profile-detail">
                  <span>{translate('name')}</span>
                  <strong>{currentUser?.name}</strong>
                </div>
                <div className="profile-detail">
                  <span>{translate('email')}</span>
                  <strong>{currentUser?.email}</strong>
                </div>
                <div className="profile-detail">
                  <span>{translate('role')}</span>
                  <strong>{currentUser?.authority}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-footer">
            <Button
              key={`${uniqueId()}`}
              icon={<LogoutOutlined />}
              onClick={() => navigate('/logout')}
            >
              {translate('Logout')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
