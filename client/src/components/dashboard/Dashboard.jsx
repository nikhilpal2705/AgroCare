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
import useResponsive from 'hooks/useResponsive';
const Dashboard = () => {
  const translate = getLabel();
  const navigate = useNavigate();
  const { screenSize } = useResponsive();
  const alertsSectionRef = useRef(null);
  const isTaskPanelStacked = !screenSize?.lg;
  const isCompactDashboard = !screenSize?.md;
  const dashboardSectionGap = isCompactDashboard ? 24 : 32;

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

  const taskParams = {
    start: dayjs().format('YYYY-MM-DD'),
    end: dayjs().add(14, 'day').format('YYYY-MM-DD'),
  };

  const { result: taskIrrigationResult, isLoading: taskIrrigationLoading } = useFetch(() =>
    api.list({ entity: 'dashboard-irrigation', params: taskParams })
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

  const todayKey = dayjs().format('YYYY-MM-DD');
  const upcomingDeadlineKey = dayjs().add(7, 'day').format('YYYY-MM-DD');

  const formatIrrigationDate = (value) => {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('DD MMM') : value;
  };

  const getTaskPurpose = () => {
    return 'Irrigation';
  };

  const scheduledTasks = Array.isArray(taskIrrigationResult) ? taskIrrigationResult : [];
  const todaysTasks = scheduledTasks.filter((item) => dayjs(item?.scheduledDate).format('YYYY-MM-DD') === todayKey);
  const upcomingDeadlines = scheduledTasks.filter((item) => {
    const itemDate = dayjs(item?.scheduledDate).format('YYYY-MM-DD');
    return itemDate > todayKey && itemDate <= upcomingDeadlineKey;
  });

  const taskStats = [
    {
      label: "Today's tasks",
      value: todaysTasks.length,
      accent: '#2f54eb',
      tint: 'rgba(47, 84, 235, 0.08)',
    },
    {
      label: 'Upcoming deadlines',
      value: upcomingDeadlines.length,
      accent: '#fa8c16',
      tint: 'rgba(250, 140, 22, 0.08)',
    },
  ];

  const taskPaneStyle = (accent, tint) => ({
    border: `1px solid ${accent}20`,
    borderRadius: 12,
    background: `linear-gradient(180deg, ${tint} 0%, rgba(255, 255, 255, 0.98) 100%)`,
    padding: isCompactDashboard ? 14 : 16,
    height: '100%',
    minHeight: isTaskPanelStacked ? 'auto' : 220,
    boxShadow: '0 8px 22px rgba(34, 7, 94, 0.04)',
  });

  const taskItemStyle = (borderColor) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
    padding: isCompactDashboard ? '12px' : '12px 14px',
    borderRadius: 10,
    background: '#fff',
    border: `1px solid ${borderColor}`,
  });

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: dashboardSectionGap }}>
        <Row gutter={[32, 32]}>
          {cards}
        </Row>

        <Row gutter={[32, 32]}>
          <Col className="gutter-row w-full" xs={{ span: 24 }} lg={{ span: 24 }}>
            <div
              className="whiteBox shadow pad20"
              style={{
                height: '100%',
                borderRadius: 18,
                background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
                padding: isCompactDashboard ? 18 : 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: isCompactDashboard ? 'stretch' : 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                  padding: isCompactDashboard ? '4px 2px 16px' : '8px 10px 18px',
                  borderBottom: '1px solid #eef2f0',
                  marginBottom: 18,
                }}
              >
                <div style={{ minWidth: 0, flex: '1 1 260px' }}>
                  <h3
                    style={{
                      color: '#22075e',
                      fontSize: isCompactDashboard ? 16 : 18,
                      marginBottom: 6,
                      textTransform: 'capitalize',
                    }}
                  >
                    Today's Tasks & Upcoming Deadlines
                  </h3>
                  <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                    A quick view of irrigation work due now and next week.
                  </div>
                </div>

                <div
                  style={{
                    display: isCompactDashboard ? 'grid' : 'flex',
                    gridTemplateColumns: screenSize?.sm ? 'repeat(2, minmax(0, 1fr))' : '1fr',
                    gap: 10,
                    flexWrap: 'wrap',
                    width: isCompactDashboard ? '100%' : 'auto',
                  }}
                >
                  {taskStats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        minWidth: isCompactDashboard ? 0 : 140,
                        borderRadius: 10,
                        padding: '9px 12px',
                        background: `linear-gradient(180deg, ${stat.tint} 0%, #ffffff 100%)`,
                        border: `1px solid ${stat.accent}22`,
                      }}
                    >
                      <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{stat.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 24, fontWeight: 700, color: stat.accent }}>{stat.value}</span>
                        <span style={{ fontSize: 12, color: '#8c8c8c' }}>items</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Row gutter={[32, 32]}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <div style={taskPaneStyle('#2f54eb', 'rgba(47, 84, 235, 0.08)')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <h4 style={{ color: '#22075e', marginBottom: 0, fontSize: 15 }}>Today's Tasks</h4>
                      <Tag color="blue">{todaysTasks.length} due now</Tag>
                    </div>
                    <List
                      dataSource={todaysTasks}
                      loading={taskIrrigationLoading}
                      split={false}
                      locale={{
                        emptyText: (
                          <div style={{ minHeight: isCompactDashboard ? 96 : 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Empty description="No tasks due today" />
                          </div>
                        ),
                      }}
                      renderItem={(item) => (
                        <List.Item style={{ padding: 0, marginBottom: 12, borderBottom: 'none' }}>
                          <div style={taskItemStyle('#edf2ff')}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                <div style={{ fontWeight: 600, color: '#1f1f1f', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item?.cropName || 'Untitled crop task'}
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#2f54eb', whiteSpace: 'nowrap' }}>
                                  {getTaskPurpose(item)}
                                </span>
                              </div>
                              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{formatIrrigationDate(item?.scheduledDate)}</div>
                            </div>
                            <Tag color={tagColor(item?.status)?.color}>{tagColor(item?.status)?.label}</Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                </Col>

                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <div style={taskPaneStyle('#fa8c16', 'rgba(250, 140, 22, 0.08)')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <h4 style={{ color: '#22075e', marginBottom: 0, fontSize: 15 }}>Upcoming Deadlines</h4>
                      <Tag color="orange">Next 7 days</Tag>
                    </div>
                    <List
                      dataSource={upcomingDeadlines}
                      loading={taskIrrigationLoading}
                      split={false}
                      locale={{
                        emptyText: (
                          <div style={{ minHeight: isCompactDashboard ? 96 : 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Empty description="No upcoming deadlines" />
                          </div>
                        ),
                      }}
                      renderItem={(item) => (
                        <List.Item style={{ padding: 0, marginBottom: 12, borderBottom: 'none' }}>
                          <div style={taskItemStyle('#fff0db')}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                <div style={{ fontWeight: 600, color: '#1f1f1f', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item?.cropName || 'Untitled crop task'}
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#2f54eb', whiteSpace: 'nowrap' }}>
                                  {getTaskPurpose(item)}
                                </span>
                              </div>
                              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{formatIrrigationDate(item?.scheduledDate)}</div>
                            </div>
                            <Tag color={tagColor(item?.status)?.color}>{tagColor(item?.status)?.label}</Tag>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row gutter={[32, 32]}>
          <DashboardCharts
            irrigationData={chartIrrigationResult}
            cropsData={cropsResult}
            irrigationLoading={chartIrrigationLoading}
            cropsLoading={cropsLoading}
          />
        </Row>

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
    </div>
  )
}
export default Dashboard
