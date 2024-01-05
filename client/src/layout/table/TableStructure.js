import dayjs from 'dayjs';
import { Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { countryList } from 'helper/countryList';
import { generate as uniqueId } from 'shortid';
import translate from 'helper/toTitleCase';

export function dataForTable({ fields }) {
  let columns = [];

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
          const date = dayjs(record[key]).format('DD/MM/YYYY');
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

      stringWithColor: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            <Tag bordered={false} color={record.color}>
              {text}
            </Tag>
          );
        },
      },
      tag: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          return (
            <Tag bordered={false} color={field.color}>
              {record[key] && record[key]}
            </Tag>
          );
        },
      },
      selectwithfeedback: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && translate(record[key])}
              </Tag>
            );
          } else return record[key] && translate(record[key]);
        },
      },
      select: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && record[key]}
              </Tag>
            );
          } else return record[key] && record[key];
        },
      },
      selectWithTranslation: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && translate(record[key])}
              </Tag>
            );
          } else return record[key] && translate(record[key]);
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
        ? columns.push(component[type])
        : columns.push(defaultComponent);
    }
  });

  return columns;
}

