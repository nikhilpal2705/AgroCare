import { Table } from 'antd';

import api from 'api/api';
import useFetch from 'hooks/useFetch';

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns } = props;

  dataTableColumns = [
    ...dataTableColumns,
  ];

  const asyncList = () => {
    return api.list({ entity });
  };
  const { result, isLoading, isSuccess } = useFetch(asyncList);
  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };

  return (
    <Table
      columns={dataTableColumns}
      rowKey={(item) => item._id}
      dataSource={isSuccess && firstFiveItems()}
      pagination={false}
      loading={isLoading}
      scroll={{ x: true }}
    />
  );
}
