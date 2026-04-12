import { Tag, Table } from 'antd';
import dayjs from 'dayjs';

const roleColor = (role) => (role === 'ADMIN' ? 'geekblue' : 'green');

const statusColor = (status) => {
  switch (status) {
    case 1:
      return 'green';
    case 2:
      return 'gold';
    case 3:
      return 'red';
    default:
      return 'blue';
  }
};

const AdminUsersTable = ({ users = [], loading = false, pagination = false, showUsageColumns = true }) => {
  const baseColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value) => <Tag color={roleColor(value)}>{value}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={statusColor(value)}>{value === 1 ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Language',
      dataIndex: 'preferredLanguage',
      key: 'preferredLanguage',
      render: () => <Tag color="default">English</Tag>,
    },
  ];

  const usageColumns = [
    {
      title: 'Farms',
      dataIndex: 'farmCount',
      key: 'farmCount',
    },
    {
      title: 'Crops',
      dataIndex: 'cropCount',
      key: 'cropCount',
    },
    {
      title: 'Pests',
      dataIndex: 'pestCount',
      key: 'pestCount',
    },
    {
      title: 'Inventory',
      dataIndex: 'inventoryCount',
      key: 'inventoryCount',
    },
    {
      title: 'Irrigation',
      dataIndex: 'irrigationCount',
      key: 'irrigationCount',
    },
    {
      title: 'Alerts',
      dataIndex: 'alertCount',
      key: 'alertCount',
    },
  ];

  const trailingColumns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => (value ? dayjs(value).format('DD-MM-YYYY HH:mm') : '-'),
    },
  ];

  const columns = showUsageColumns
    ? [...baseColumns, ...usageColumns, ...trailingColumns]
    : [...baseColumns, ...trailingColumns];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(item) => item.id}
      loading={loading}
      pagination={pagination}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default AdminUsersTable;