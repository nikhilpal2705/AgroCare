import { Row, Layout } from 'antd';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import SummaryCard from './SummaryCard';
const Dashboard = () => {
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
  ];

  const cards = entityData.map((data, index) => {
    const { result, isLoading } = data;
    return (
      <SummaryCard
        key={index}
        title={data?.entity}
        tagColor={
          data?.entity
        }
        prefix={'Count'}
        isLoading={isLoading}
        tagContent={result}
      />
    );
  });

  return (
    <Layout className="site-layout">
      <Row gutter={[32, 32]}>
        {cards}
      </Row>
    </Layout>
  )
}
export default Dashboard
