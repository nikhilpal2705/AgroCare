import { Link, NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  // SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  // FaRegLaughWink
} from 'react-icons/fa';
import sidebarBg from '../assets/images/bg1.jpg';
import logo from '../assets/images/logo.png';

const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                <img src={logo} alt="AgroCare" width="100%" />
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}
          // suffix={<span className="badge red">NEW</span>}
          >
            Dashboard
            <NavLink to="/dashboard" />
          </MenuItem>
          <MenuItem icon={<FaGem />}> Crop Monitoring
            <Link to="/crop-monitoring" />
          </MenuItem>
          {/* <SubMenu
            suffix={<span className="badge yellow">3</span>} // prefix={<span className="badge gray">3</span>}
            title={'With Suffix'}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu> */}
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: 'pointer' }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
