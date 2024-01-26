import { Table } from 'antd';

import api from 'api/api';
import dayjs from 'dayjs';
import useFetch from 'hooks/useFetch';

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns } = props;

  dataTableColumns = [
    ...dataTableColumns,
  ];

  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
  
  const params = {
    start: startOfMonth,
    end: endOfMonth
  }

  const asyncList = () => {
    return api.list({ entity, params });
  };
  const { result, isLoading, isSuccess } = useFetch(asyncList);
  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };

  return (
    <Table
      columns={dataTableColumns}
      rowKey={(item) => item.id}
      dataSource={isSuccess && firstFiveItems()}
      pagination={false}
      loading={isLoading}
      scroll={{ x: true }}
    />
  );
}
