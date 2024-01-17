import { useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentItem } from '../../redux/crud/selectors';

const generateColumns = (fields) => {
  let columns = [];
  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    columns.push({
      title: field.label ? field.label : key,
      dataIndex: field.dataIndex ? field.dataIndex.join('.') : key,
      isDate: field.type === 'date',
    });
  });
  return columns;
}
const valueByString = (obj, string, divider = '|') =>
  string.split(divider).map(key => key.split('.').reduce((o, x) => o?.[x], obj)).join(' ');

export default function ReadItem({ config }) {
  const { fields } = config;

  const readColumns = useMemo(() => {
    return fields ? generateColumns(fields) : [];
  }, [fields]);

  const { result: currentResult } = useSelector(selectCurrentItem);
  const [listState, setListState] = useState([]);

  useEffect(() => {
    const list = readColumns.map(props => {
      const value = props.isDate ? dayjs(valueByString(currentResult, props.dataIndex)).format('DD-MM-YYYY') : valueByString(currentResult, props.dataIndex);
      return {
        propsKey: props.dataIndex,
        label: props.title,
        value: value,
      };
    });
    setListState(list);
  }, [currentResult, readColumns]);

  return (
    <div>
      {listState.map(item => (
        <Row key={item.propsKey} gutter={12}>
          <Col className="gutter-row" span={8}><p>{item.label}</p></Col>
          <Col className="gutter-row" span={2}><p> : </p></Col>
          <Col className="gutter-row" span={14}><p>{item.value}</p></Col>
        </Row>
      ))}
    </div>
  );
}
