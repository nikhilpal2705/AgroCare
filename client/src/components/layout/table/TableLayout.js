import { Layout, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { generate as uniqueId } from 'shortid';
import DataTable from './DataTable';
import { CrudContextProvider, useCrudContext } from 'contexts/crud';
import CrudLayout from 'components/layout/crud/CrudLayout';
const { Content } = Layout;


function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handelClick = () => {
    panel.open();
    collapsedBox.close();
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
    <>
      <CrudContextProvider>
        <CrudLayout config={config} />
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
      </CrudContextProvider>
    </>
  );
}

export default TableLayout;
