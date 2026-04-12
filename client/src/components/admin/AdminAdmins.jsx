import api from 'api/api';
import useFetch from 'hooks/useFetch';
import { ADMIN_BASE_URL } from 'api/config';
import AdminCreateUser from './AdminCreateUser';
import AdminListPage from './AdminListPage';

const AdminAdmins = () => {
  const { result, isLoading } = useFetch(() => api.get({ entity: ADMIN_BASE_URL + 'admins' }));

  return (
    <AdminListPage
      title="Admin List"
      actions={<AdminCreateUser />}
      users={result || []}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      tableProps={{ showUsageColumns: false }}
    />
  );
};

export default AdminAdmins;