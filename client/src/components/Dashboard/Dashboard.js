import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
const Dashboard = () => {
  return (
    <Layout className="site-layout">
      <Content
        className="whiteBox shadow"
        style={{
          padding: '50px 40px',
          margin: '40px auto',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        <div>Dashboard</div>

      </Content>
    </Layout>
  )
}
export default Dashboard
