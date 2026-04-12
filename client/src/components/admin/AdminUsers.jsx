import api from 'api/api';
import useFetch from 'hooks/useFetch';
import { ADMIN_BASE_URL } from 'api/config';
import AdminListPage from './AdminListPage';

const AdminUsers = () => {
  const { result, isLoading } = useFetch(() => api.get({ entity: ADMIN_BASE_URL + 'users' }));

  return <AdminListPage title="All Farmers" users={result || []} loading={isLoading} pagination={{ pageSize: 10 }} />;
};

export default AdminUsers;