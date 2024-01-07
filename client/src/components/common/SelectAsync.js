import { useState, useEffect } from 'react';
import api from 'api/api';
import useFetch from 'hooks/useFetch';
import { Select } from 'antd';
import { generate as uniqueId } from 'shortid';

const SelectAsync = ({
  entity,
  displayLabels = ['name'],
  outputValue = 'id',
  value,
  onChange,
}) => {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const asyncList = () => {
    return api.list({ entity });
  };
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  useEffect(() => {
    isSuccess && result && setOptions(result);
  }, [isSuccess, result]);

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };
  useEffect(() => {
    if (value) {
      const val = value[outputValue] ?? value;
      setCurrentValue(val);
      onChange(val);
    }
  }, [value]);

  const handleSelectChange = (newValue) => {
    const val = newValue[outputValue] ?? newValue;
    setCurrentValue(newValue);
    onChange(val);
  };

  const optionsList = () => {
    const list = [];
    selectOptions.map((optionField) => {
      const value = optionField[outputValue] ?? optionField;
      const label = labels(optionField);
      list.push({ value, label });
    });

    return list;
  };

  return (
    <Select
      loading={fetchIsLoading}
      disabled={fetchIsLoading}
      value={currentValue}
      onChange={handleSelectChange}
    >
      {optionsList()?.map((option) => {
        return (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {option.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectAsync;
