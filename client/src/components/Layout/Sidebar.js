import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import logo from '../../assets/images/logo.png';
import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  DashboardOutlined,
  TagOutlined,
  UserOutlined,
  CreditCardOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import useResponsive from '../../hooks/useResponsive';

const { Sider } = Layout;
export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}
function Sidebar({ collapsible, isMobile = false }) {
  const location = useLocation();
  const isNavMenuClose = false
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/dashboard'}>Dashboard</Link>,
    },
    {
      key: 'crop-monitoring',
      icon: <FilterOutlined />,
      label: <Link to={'/crop-monitoring'}>Crop Monitoring</Link>,
    },
    // {
    //   key: 'customer',
    //   icon: <CustomerServiceOutlined />,
    //   label: <Link to={'/customer'}>Customer</Link>,
    // },
    // {
    //   key: 'people',
    //   icon: <UserOutlined />,
    //   label: <Link to={'/people'}>People</Link>,
    // },
    // {
    //   key: 'payment',
    //   icon: <CreditCardOutlined />,
    //   label: <Link to={'/payment'}>Payment</Link>,
    // },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link to={'/settings'}>Settings</Link>,
    },
  ];
  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      className="navigation"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        ...(!isMobile && {
          border: 'none',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div className="logo">
        <img src={logo} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
        }}
      />
    </Sider>
  );
};


function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
