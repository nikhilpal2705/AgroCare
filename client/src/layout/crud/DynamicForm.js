import { useState } from 'react';
import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import getLabel from 'helper/getLabel';
import SelectAsync from 'components/common/SelectAsync';
import { generate as uniqueId } from 'shortid';
import { countryList } from 'helper/countryList';

export default function DynamicForm({ fields, isUpdateForm = false }) {
  const [feedback, setFeedback] = useState();

  return (
    <>
      {Object.entries(fields).map(([key, field]) => {
        if ((isUpdateForm && !field.disableForUpdate) || !field.disableForForm) {
          field.name = key;
          if (!field.label) field.label = key;
          return <FormElement key={key} field={field} setFeedback={setFeedback} feedback={feedback} />;
        }
        return null;
      })}
    </>
  );
}

function FormElement({ field, setFeedback, feedback }) {
  const translate = getLabel();
  const { TextArea } = Input;

  const commonSelectProps = {
    defaultValue: field.defaultValue,
    style: { width: '100%' }
  };

  const components = {
    string: <Input autoComplete="off" />,
    url: <Input addonBefore="http://" autoComplete="off" placeholder="www.website.com" />,
    textarea: <TextArea rows={4} />,
    email: <Input autoComplete="off" placeholder="email@gmail.com" />,
    number: <InputNumber style={{ width: '100%' }} />,
    phone: <Input style={{ width: '100%' }} placeholder="+1 123 456 789" />,
    boolean: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    date: <DatePicker placeholder={translate('select_date')} style={{ width: '100%' }} format={'DD-MM-YYYY'} />,
    select: renderSelect(field.options, commonSelectProps, translate),
    selectwithfeedback: renderSelect(field.options, commonSelectProps, translate, setFeedback),
    color: renderSelect(field.options, commonSelectProps, translate),
    tag: renderSelect(field.options, commonSelectProps, translate, true),
    array: renderSelect(field.options, { ...commonSelectProps, mode: 'multiple' }, translate),
    country: renderSelect(countryList.map(item => ({ value: item.value, label: translate(item.label) })), commonSelectProps, translate),
    async: <SelectAsync entity={field.entity} displayLabels={field.displayLabels} outputValue={field.outputValue} />,
    currency: <InputNumber className="moneyInput" min={0} controls={false} addonBefore={'$'} />
  };

  const fieldType = {
    string: 'string',
    textarea: 'string',
    number: 'number',
    phone: 'string',
    url: 'url',
    website: 'url',
    email: 'email',
  };

  const renderComponent = components[field.type] || components['string'];

  return (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: fieldType[field.type] || 'any',
          message: `Please enter ${field.label}`
        },
      ]}
      valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
    >
      {renderComponent}
    </Form.Item>
  );
}

function renderSelect(options, props, translate, onChange = null) {
  return (
    <Select {...props} onChange={onChange}>
      {options?.map(option => (
        <Select.Option key={uniqueId()} value={option.value}>
          {translate(option.label)}
        </Select.Option>
      ))}
    </Select>
  );
}
