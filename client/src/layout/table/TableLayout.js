import { Layout, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { generate as uniqueId } from 'shortid';
import DataTable from './DataTable';
import { useCrudContext } from 'contexts/crud';
const { Content } = Layout;


function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { panel, addBox } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handelClick = () => {
    addBox.open();
    panel.open();
  };

  return (
    <Button onClick={handelClick} type="primary">
      {ADD_NEW_ENTITY}
    </Button>
  );
}

function TableLayout({ config }) {
  let { DATATABLE_TITLE } = config;
  return (
    <Content
      className="whiteBox shadow layoutPadding"
      style={{
        margin: '40px auto',
        width: '100%',
        maxWidth: '100%',
        flex: 'none',
      }}
    >
      <PageHeader
        onBack={() => window.history.back()}
        title={DATATABLE_TITLE}
        ghost={false}
        extra={[
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      />
      <DataTable config={config} />
    </Content>

  );
}

export default TableLayout;
