import { useCallback, useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Table } from 'antd';
import { useCrudContext } from 'contexts/crud';
import { dataForTable } from './TableStructure';
import getLabel from 'helper/getLabel';

import { useSelector, useDispatch } from 'react-redux';
import { selectListItems } from '../../redux/crud/selectors';
import { crud } from '../../redux/crud/actions';

export default function DataTable({ config }) {
  const translate = getLabel();
  let { fields, entity } = config;
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
    dispatch(crud.currentItem({ data: record }));
    readBox.open();
    panel.open();
  }

  function handleEdit(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open();
    panel.open();
  }

  function handleDelete(record) {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  }

  let columns = [...dataForTable({ fields, translate })];
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

  const dispatch = useDispatch();

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { items: dataSource } = listResult;
  const [, setTableData] = useState(dataSource);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: dataSource.length,
    showSizeChanger: false,
    pageSizeOptions: ['10', '20', '30', '40'],
  });

  const handleDataTableLoad = useCallback((pagination) => {
    const { current, pageSize } = pagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dataSource.slice(start, end));
    // Update the total
    setPagination({ ...pagination, total: dataSource.length });
  }, [dataSource]);


  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item.id}
        dataSource={dataSource}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleDataTableLoad}
        scroll={{ x: true }}
      />
    </>
  );
}
