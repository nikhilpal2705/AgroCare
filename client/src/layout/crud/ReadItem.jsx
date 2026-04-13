import { useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentItem } from '../../redux/crud/selectors';
import { tagColor } from 'helper/statusTagColor';
import getLabel from 'helper/getLabel';

const generateColumns = (fields, readFieldOrder = []) => {
  let columns = [];
  const orderedKeys = Array.isArray(readFieldOrder) && readFieldOrder.length
    ? [
        ...readFieldOrder.filter((key) => fields[key]),
        ...Object.keys(fields).filter((key) => !readFieldOrder.includes(key)),
      ]
    : Object.keys(fields);

  orderedKeys.forEach((key) => {
    let field = fields[key];
    if (field.disableForRead) return;
    columns.push({
      field,
      title: field.readLabel ? field.readLabel : (field.label ? field.label : key),
      dataIndex: field.dataIndex ? field.dataIndex.join('.') : key,
      isDate: field.type === 'date',
    });
  });
  return columns;
}
const valueByString = (obj, string, divider = '|') =>
  string.split(divider).map(key => key.split('.').reduce((o, x) => o?.[x], obj)).join(' ');

export default function ReadItem({ config }) {
  const translate = getLabel();

  const { fields, readFieldOrder } = config;

  const readColumns = useMemo(() => {
    return fields ? generateColumns(fields, readFieldOrder) : [];
  }, [fields, readFieldOrder]);

  const { result: currentResult } = useSelector(selectCurrentItem);
  const [listState, setListState] = useState([]);

  const mapPreview = useMemo(() => {
    if (!fields || !currentResult) return null;

    const geolocationEntry = Object.entries(fields).find(([, field]) => field.type === 'geolocation');
    if (!geolocationEntry) return null;

    const [latitudeKey, geolocationField] = geolocationEntry;
    const longitudeKey = geolocationField.longitudeFieldName || 'gpsLongitude';
    const latitude = Number(currentResult?.[latitudeKey]);
    const longitude = Number(currentResult?.[longitudeKey]);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

    const delta = 0.01;
    const bbox = [
      longitude - delta,
      latitude - delta,
      longitude + delta,
      latitude + delta,
    ].join(',');

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${latitude},${longitude}`)}`;

    return {
      latitude,
      longitude,
      mapUrl,
    };
  }, [fields, currentResult]);

  useEffect(() => {
    const list = readColumns.map(props => {
      const fieldValue = valueByString(currentResult, props.dataIndex)
      const selectedOption = props.field?.type === 'select'
        ? props.field.options?.find((option) => option.value === fieldValue)
        : null;
      const value = props.isDate
        ? (fieldValue ? dayjs(fieldValue).format('DD-MM-YYYY') : '---')
        : (selectedOption?.label || fieldValue);
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
          <Col className="gutter-row" span={14}><p>{item.label == 'Status' || item.label == 'status' ? translate(tagColor(item.value)?.label) : item.value}</p></Col>
        </Row>
      ))}

      {mapPreview ? (
        <div style={{ marginTop: 16 }}>
          <iframe
            title="Farm location map"
            src={mapPreview.mapUrl}
            style={{ width: '100%', height: 220, border: '1px solid #f0f0f0', borderRadius: 8 }}
            loading="lazy"
          />
        </div>
      ) : null}
    </div>
  );
}
