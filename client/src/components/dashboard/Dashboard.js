import { Row, Col, Tag } from 'antd';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import SummaryCard from './SummaryCard';
import RecentTable from './RecentTable';
import { tagColor } from 'helper/statusTagColor';
import dayjs from 'dayjs';
import getLabel from 'helper/getLabel';
const Dashboard = () => {
  const translate = getLabel();

  const { result, isLoading } = useFetch(() =>
    api.get({ entity: 'user/dashboard' })
  );

  const entityData = [
    {
      result: result ? result.cropCount : 0,
      isLoading: isLoading,
      entity: 'Crops',
      title: 'Crops Count',
    },
    {
      result: result ? result.pestCount : 0,
      isLoading: isLoading,
      entity: 'Pests',
      title: 'Pests Count',
    },
    {
      result: result ? result.pestCount : 0,
      isLoading: isLoading,
      entity: 'Inventory',
      title: 'Inventory Count',
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, isLoading } = data;
    return (
      <SummaryCard
        key={index}
        title={data?.entity}
        tagColor={
          data?.entity === 'Crops' ? 'cyan' : data?.entity === 'Pests' ? 'purple' : 'green'
        }
        prefix={'Count'}
        isLoading={isLoading}
        tagContent={result}
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
