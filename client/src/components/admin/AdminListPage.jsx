import { Layout } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import AdminUsersTable from './AdminUsersTable';

const { Content } = Layout;

const defaultContainerStyle = {
  margin: '40px auto',
  width: '100%',
  maxWidth: '100%',
  flex: 'none',
};

const AdminListPage = ({
  title,
  users = [],
  loading = false,
  pagination = false,
  actions = null,
  showBack = true,
  containerStyle = {},
  tableProps = {},
}) => {
  return (
    <Content
      className="whiteBox shadow layoutPadding"
      style={{ ...defaultContainerStyle, ...containerStyle }}
    >
      <PageHeader
        onBack={showBack ? () => window.history.back() : undefined}
        title={title}
        ghost={false}
        className="responsive-page-header"
        extra={actions ? [actions] : []}
        style={{
          padding: '20px 0px',
        }}
      />
      <AdminUsersTable users={users} loading={loading} pagination={pagination} {...tableProps} />
    </Content>
  );
};

export default AdminListPage;
