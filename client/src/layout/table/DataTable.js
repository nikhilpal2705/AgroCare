import { useCallback, useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Table } from 'antd';
import { useCrudContext } from 'contexts/crud';
import { dataForTable } from './TableStructure';
import api from 'api/api';
import useFetch from 'hooks/useFetch';


export default function DataTable({ config }) {
  let { dataSource, fields, entity } = config;
  const { crudContextAction } = useCrudContext();
  const { panel, modal, readBox, editBox } = crudContextAction;
  const items = [
    {
      label: 'View',
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];

  const handleRead = (record) => {
    readBox.open();
    panel.open();
  }

  function handleEdit(record) {
    editBox.open();
    panel.open();
  }

  function handleDelete(record) {
    modal.open();
  }

  let columns = [...dataForTable({ fields })]
  let dataTableColumns = [
    ...columns,
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;

                case 'delete':
                  handleDelete(record);
                  break;
                default:
                  break;
              }
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];
  const [, setTableData] = useState(dataSource);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: dataSource.length,
    showSizeChanger: false,
    pageSizeOptions: ['10', '20', '30', '40'],
  });


  const handleDataTableLoad = useCallback((pagination) => {
    // Implement data loading logic here based on pagination
    const { current, pageSize } = pagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dataSource.slice(start, end));

    // Update the total count if necessary
    setPagination({ ...pagination, total: dataSource.length });
  }, [dataSource]);


  const [selectOptions, setOptions] = useState([]);

  const asyncList = () => {
    return api.listAll({ entity });
  };
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  useEffect(() => {
    if (isSuccess) {
      console.log(`😱 😓 😒 ~ file: DataTable.js:118 ~ useEffect ~ result:`, result)
    }

  }, [isSuccess, result]);

  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item.id}
        dataSource={dataSource}
        pagination={pagination}
        loading={fetchIsLoading}
        onChange={handleDataTableLoad}
        scroll={{ x: true }}
      />
    </>
  );
}
