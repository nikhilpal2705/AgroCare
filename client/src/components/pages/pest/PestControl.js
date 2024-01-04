import React from 'react'
import CrudModule from 'components/layout/table/TableLayout';
const PestControl = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 30,
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 25,
    },
  ];
  let config = {
    columns: columns,
    dataSource: dataSource,
    DATATABLE_TITLE: 'Pest List',
    ADD_NEW_ENTITY: 'Add Pest',
    PANEL_TITLE: 'Pest'
  }
  return (
    <CrudModule
      config={config}
    />
  );
}

export default PestControl