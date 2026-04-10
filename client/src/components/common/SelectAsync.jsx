import { useState, useEffect } from 'react';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import { Select } from 'antd';
import { generate as uniqueId } from 'shortid';

const SelectAsync = ({
  entity,
  displayLabels,
  outputValue = 'id',
  value,
  onChange,
}) => {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const asyncList = () => api.list({ entity });
  const { result, isLoading } = useFetch(asyncList);

  useEffect(() => {
    if (result) setOptions(result);
  }, [result]);

  useEffect(() => {
    if (value) {
      const val = value[outputValue] || value;
      setCurrentValue(val);
      onChange(val);
    }
  }, [value]);

  const labels = (optionField) => displayLabels.map((x) => optionField[x]).join(' ');

  const handleSelectChange = (newValue) => {
    const val = newValue[outputValue] || newValue;
    setCurrentValue(newValue);
    onChange(val);
  };

  const optionsList = selectOptions.map((optionField) => ({
    value: optionField[outputValue] || optionField,
    label: labels(optionField),
  }));

  return (
    <Select
      loading={isLoading}
      disabled={isLoading}
      value={currentValue}
      onChange={handleSelectChange}
    >
      {optionsList.map((option) => (
        <Select.Option key={uniqueId()} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectAsync;
