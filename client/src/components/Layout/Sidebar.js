import { NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
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
} from 'react-icons/fa';
import sidebarBg from '../../assets/images/bg1.jpg';
import logo from '../../assets/images/logo.png';

const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  const isNavLinkActive = (path) => window.location.pathname === path;
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
          <MenuItem icon={<FaTachometerAlt className={isNavLinkActive('/dashboard') ? 'active' : ''} />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </MenuItem>
          <MenuItem icon={<FaGem className={isNavLinkActive('/crop-monitoring') ? 'active' : ''} />}>
            <NavLink to="/crop-monitoring">Crop Monitoring</NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <NavLink className="sidebar-btn" style={{ cursor: 'pointer' }} to="/profile">
            <FaUser />
            <span>My Account</span>
          </NavLink>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
