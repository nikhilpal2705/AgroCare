import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import translate from 'helper/toTitleCase'


const dataForRead = ({ fields }) => {
  let columns = [];

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    columns.push({
      title: translate(key),
      dataIndex: key,
      isDate: field.type === 'date',
    });
  });

  return columns;
};

export default function ReadItem({ config }) {
  let { fields, readColumns } = config;
  const [listState, setListState] = useState([]);
  if (fields) readColumns = [...dataForRead({ fields: fields })];
  console.log(`😱 😓 😒 ~ file: ReadItem.js:23 ~ ReadItem ~ readColumns:`, readColumns)

  useEffect(() => {
    const list = [];
    readColumns.map((props) => {
      const propsKey = props.dataIndex;
      const propsTitle = props.title;
      const isDate = props.isDate || false;
      let value = ''
      // let value = valueByString(currentResult, propsKey);
      value = isDate ? dayjs(value).format('DD-MM-YYYY') : value;
      list.push({ propsKey, label: propsTitle, value: value });
    });
    setListState(list);
  }, []);

  const itemsList = listState.map((item) => {
    return (
      <Row key={item.propsKey} gutter={12}>
        <Col className="gutter-row" span={8}>
          <p>{item.label}</p>
        </Col>
        <Col className="gutter-row" span={2}>
          <p> : </p>
        </Col>
        <Col className="gutter-row" span={14}>
          <p>{item.value}</p>
        </Col>
      </Row>
    );
  });

  return <div>{itemsList}</div>;
}
