import dayjs from 'dayjs';
import { Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { countryList } from 'helper/countryList';
import { generate as uniqueId } from 'shortid';

export function dataForTable({ fields, translate, dateFormat = 'DD-MM-YYYY' }) {
  let columns = [];

  const withNoWrap = (column) => ({
    ...column,
    onHeaderCell: () => ({
      style: {
        whiteSpace: 'nowrap',
      },
    }),
    onCell: (...args) => {
      const existingCell = typeof column.onCell === 'function' ? column.onCell(...args) : {};
      return {
        ...existingCell,
        style: {
          ...(existingCell.style || {}),
          whiteSpace: 'nowrap',
        },
      };
    },
  });

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    const keyIndex = field.dataIndex ? field.dataIndex : [key];

    const component = {
      boolean: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        onCell: () => ({
          props: {
            style: {
              width: '60px',
            },
          },
        }),
        render: (_, record) => (
          <Switch
            checked={record[key]}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        ),
      },
      date: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const date = record[key] ? dayjs(record[key]).format(dateFormat) : '';
          return (
            <Tag bordered={false} color={field.color}>
              {date}
            </Tag>
          );
        },
      },
      async: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            <Tag bordered={false} color={field.color || record[key]?.color || record.color}>
              {text}
            </Tag>
          );
        },
      },
      tag: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          if (field.tagWithColor) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={true} color={selectedOption?.color}>
                {selectedOption && translate(selectedOption?.label)}
              </Tag>
            );
          } else return record[key];
        }
      },
      select: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const selectedOption = field.options?.find((option) => option.value === record[key]);

          if (field.renderAsTag) {
            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {selectedOption?.label || record[key]}
              </Tag>
            );
          } else return selectedOption?.label || record[key];
        },
      },
      array: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          return record[key].map((x) => (
            <Tag bordered={false} key={`${uniqueId()}`} color={field.colors[x]}>
              {x}
            </Tag>
          ));
        },
      },
      country: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const selectedCountry = countryList.find((obj) => obj.value === record[key]);

          return (
            <Tag bordered={false} color={field.color || undefined}>
              {selectedCountry?.icon && selectedCountry?.icon + ' '}
              {selectedCountry?.label && translate(selectedCountry.label)}
            </Tag>
          );
        },
      },
    };

    const defaultComponent = {
      title: field.label ? translate(field.label) : translate(key),
      dataIndex: keyIndex,
    };

    const type = field.type;

    if (!field.disableForTable) {
      Object.keys(component).includes(type)
        ? columns.push(withNoWrap(component[type]))
        : columns.push(withNoWrap(defaultComponent));
    }
  });

  return columns;
}
