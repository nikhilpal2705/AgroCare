import { Row, Col } from 'antd';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import SummaryCard from 'components/dashboard/SummaryCard';
import { ADMIN_BASE_URL } from 'api/config';
import AdminUsersTable from './AdminUsersTable';

const AdminDashboard = () => {
  const { result, isLoading } = useFetch(() => api.get({ entity: ADMIN_BASE_URL + 'dashboard' }));
  const { result: usersResult, isLoading: usersLoading } = useFetch(() => api.get({ entity: ADMIN_BASE_URL + 'users' }));

  const cards = [
    { title: 'Users', key: 'userCount' },
    { title: 'Farmers', key: 'farmerCount' },
    { title: 'Admins', key: 'adminCount' },
    { title: 'Farms', key: 'farmCount' },
    { title: 'Crops', key: 'cropCount' },
    { title: 'Pests', key: 'pestCount' },
    { title: 'Inventory', key: 'inventoryCount' },
    { title: 'Irrigation', key: 'irrigationCount' },
    { title: 'Alerts', key: 'alertCount' },
  ].map((item, index) => (
    <SummaryCard
      key={index}
      title={item.title}
      tagColor={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'green' : 'gold'}
      prefix={'Count'}
      isLoading={isLoading}
      tagContent={result ? result[item.key] : 0}
    />
  ));

  return (
    <div
      style={{
        margin: '40px auto',
        width: '100%',
        maxWidth: '100%',
        flex: 'none',
      }}
    >
      <Row gutter={[32, 32]}>{cards}</Row>

      <div className="space30"></div>

      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 24 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3
              style={{
                color: '#22075e',
                fontSize: 'medium',
                marginBottom: 5,
                padding: '10px 20px 20px',
                textTransform: 'capitalize',
              }}
            >
              Recent Farmers
            </h3>
            <AdminUsersTable
              users={usersResult ? usersResult.slice(0, 5) : []}
              loading={usersLoading}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;