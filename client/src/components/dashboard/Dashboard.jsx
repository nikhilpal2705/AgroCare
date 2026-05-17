import { Row, Col, Tag, Alert, List, Empty } from 'antd';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import SummaryCard from './SummaryCard';
import RecentTable from './RecentTable';
import DashboardCharts from './DashboardCharts';
import { tagColor } from 'helper/statusTagColor';
import dayjs from 'dayjs';
import getLabel from 'helper/getLabel';
import { USER_BASE_URL } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const Dashboard = () => {
  const translate = getLabel();
  const navigate = useNavigate();
  const alertsSectionRef = useRef(null);

  const { result, isLoading } = useFetch(() =>
    api.get({ entity: USER_BASE_URL + 'dashboard' })
  );

  const { result: alertsResult, isLoading: alertsLoading } = useFetch(() =>
    api.get({ entity: USER_BASE_URL + 'dashboard-alerts' })
  );

  const chartParams = {
    start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    end: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  };

  const { result: chartIrrigationResult, isLoading: chartIrrigationLoading } = useFetch(() =>
    api.list({ entity: 'dashboard-irrigation', params: chartParams })
  );

  const { result: cropsResult, isLoading: cropsLoading } = useFetch(() =>
    api.list({ entity: 'crop' })
  );

  const entityData = [
    {
      result: result ? result.cropCount : 0,
      isLoading: isLoading,
      entity: 'Crops',
      title: 'Crops Count',
      onClick: () => navigate('/crop-monitoring'),
    },
    {
      result: result ? result.pestCount : 0,
      isLoading: isLoading,
      entity: 'Pests',
      title: 'Pests Count',
      onClick: () => navigate('/pest-control'),
    },
    {
      result: result ? result.inventoryCount : 0,
      isLoading: isLoading,
      entity: 'Inventory',
      title: 'Inventory Count',
      onClick: () => navigate('/inventory'),
    },
    {
      result: result ? result.unreadAlertCount : 0,
      isLoading: isLoading,
      entity: 'Alerts',
      title: 'Unread Alerts',
      onClick: undefined,
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, isLoading } = data;
    return (
      <SummaryCard
        key={index}
        title={data?.entity}
        tagColor={
          data?.entity === 'Crops' ? 'cyan' : 
          data?.entity === 'Pests' ? 'purple' : 
          data?.entity === 'Inventory' ? 'green' :
          data?.entity === 'Alerts' ? 'orange' : 'blue'
        }
        prefix={'Count'}
        isLoading={isLoading}
        tagContent={result}
        onClick={data.onClick}
        showPointer={data?.entity !== 'Alerts'}
      />
    );
  });

  const dataTableColumns = [
    {
      title: 'Crop Name',
      dataIndex: ['crop', 'cropName'],
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      render: (scheduledDate) => {
        return dayjs(scheduledDate).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const selectedTag = tagColor(status)
        return <Tag color={selectedTag?.color}>{translate(selectedTag.label)}</Tag>;
      },
    },
  ];

  const params = {
    start: dayjs().format('YYYY-MM-DD'),
    end: dayjs().endOf('month').format('YYYY-MM-DD')
  }

  // Convert severity to alert type
  const getAlertType = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <div
      style={{
        margin: '40px auto',
        width: '100%',
        maxWidth: '100%',
        flex: 'none',
      }}>
      <Row gutter={[32, 32]}>
        {cards}
      </Row>

      <div className="space30"></div>

      <Row gutter={[32, 32]}>
        <DashboardCharts
          irrigationData={chartIrrigationResult}
          cropsData={cropsResult}
          irrigationLoading={chartIrrigationLoading}
          cropsLoading={cropsLoading}
        />
      </Row>

      <div className="space30"></div>

      {/* Alerts Section */}
      {alertsResult && alertsResult.length > 0 && (
        <Row gutter={[32, 32]}>
          <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 24 }}>
            <div ref={alertsSectionRef} className="whiteBox shadow pad20" style={{ height: '100%' }}>
              <h3
                style={{
                  color: '#22075e',
                  fontSize: 'medium',
                  marginBottom: 5,
                  padding: '10px 20px 20px',
                  textTransform: 'capitalize',
                }}>
                {'Recent Alerts'}
              </h3>
              <List
                dataSource={alertsResult.slice(0, 5)}
                renderItem={(alert) => (
                  <List.Item
                    style={{
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      borderBottom: '1px solid #f0f0f0',
                    }}>
                    <Alert
                      message={alert.title}
                      description={alert.description}
                      type={getAlertType(alert.severity)}
                      showIcon
                      style={{ width: '100%' }}
                    />
                  </List.Item>
                )}
                locale={{ emptyText: <Empty description="No alerts" /> }}
              />
            </div>
          </Col>
        </Row>
      )}

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
              }}>
              {'Upcoming Irrigation' + ' (This Month)'}
            </h3>

            <RecentTable entity={'dashboard-irrigation'} dataTableColumns={dataTableColumns} params={params} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Dashboard
