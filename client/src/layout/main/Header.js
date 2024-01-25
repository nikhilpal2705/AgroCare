import { Avatar, Dropdown, Layout } from 'antd';
import { LogoutOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/selectors';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { Header } = Layout;
  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={null}
          style={{ color: '#f56a00', backgroundColor: '#f9fafc' }}
        >
          {currentUser?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentUser?.name}
          </p>
          <p>{currentUser?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };
  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text="Profile" />
        </Link>
      ),
    },
    {
      icon: <InfoCircleOutlined />,
      key: 'about',
      label: <Link to={'/about'}>About Us</Link>,
    },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to={'/logout'}>Logout</Link>,
    },
  ];
  return (
    <Header
      style={{
        padding: '20px',
        background: '#f9fafc',
        display: ' flex',
        flexDirection: ' row-reverse',
        justifyContent: ' flex-start',
        gap: ' 15px',
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right' }}
      >
        <Avatar
          className="last"
          src={null}
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {currentUser?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Dropdown>


    </Header>
  );
};

export default Header;
