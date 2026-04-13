import { useEffect, useMemo, useState } from 'react';
import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag, Button, Space, Typography } from 'antd';
import { CloseOutlined, CheckOutlined, AimOutlined } from '@ant-design/icons';
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

  if (field.type === 'geolocation') {
    return <GeoLocationField field={field} translate={translate} />;
  }

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
    tag: renderSelect(field.options, commonSelectProps, translate, null, true),
    array: renderSelect(field.options, { ...commonSelectProps, mode: 'multiple' }, translate),
    country: renderSelect(countryList.map(item => ({ value: item.value, label: translate(item.label) })), commonSelectProps, translate),
    async: <SelectAsync entity={field.entity} displayLabels={field.displayLabels} outputValue={field.outputValue} />,
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

function GeoLocationField({ field, translate }) {
  const form = Form.useFormInstance();
  const latitudeName = field.name;
  const longitudeName = field.longitudeFieldName || 'gpsLongitude';
  const addressFieldName = field.addressFieldName || 'address';
  const latitude = Form.useWatch(latitudeName, form);
  const longitude = Form.useWatch(longitudeName, form);

  const [searchValue, setSearchValue] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [options, setOptions] = useState([]);
  const [locationStatus, setLocationStatus] = useState('');

  const coordinateLabel = useMemo(() => {
    if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
      return 'No coordinates selected yet';
    }

    return `${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)}`;
  }, [latitude, longitude]);

  const mapPreview = useMemo(() => {
    const latitudeValue = Number(latitude);
    const longitudeValue = Number(longitude);

    if (!Number.isFinite(latitudeValue) || !Number.isFinite(longitudeValue)) {
      return null;
    }

    const delta = 0.01;
    const bbox = [
      longitudeValue - delta,
      latitudeValue - delta,
      longitudeValue + delta,
      latitudeValue + delta,
    ].join(',');

    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${latitudeValue},${longitudeValue}`)}`;
  }, [latitude, longitude]);

  const applyCoordinates = (lat, lon, message = 'Location selected', resolvedAddress = null) => {
    const nextValues = {
      [latitudeName]: Number(lat),
      [longitudeName]: Number(lon),
    };

    if (addressFieldName && resolvedAddress) {
      nextValues[addressFieldName] = resolvedAddress;
    }

    form.setFieldsValue(nextValues);
    setLocationStatus(message);
  };

  const reverseGeocodeFromCoordinates = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const data = await response.json();
    return data?.display_name || '';
  };

  const selectedOptionWithCoordinates = useMemo(() => {
    if (!selectedPlace && Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude))) {
      const latitudeValue = Number(latitude).toFixed(5);
      const longitudeValue = Number(longitude).toFixed(5);

      return {
        value: `coords-${latitudeValue}-${longitudeValue}`,
        label: `Selected coordinates (${latitudeValue}, ${longitudeValue})`,
        lat: latitude,
        lon: longitude,
      };
    }
    return selectedPlace;
  }, [selectedPlace, latitude, longitude]);

  const mergedOptions = useMemo(() => {
    if (!selectedOptionWithCoordinates) return options;
    const exists = options.some((option) => String(option.value) === String(selectedOptionWithCoordinates.value));
    return exists ? options : [selectedOptionWithCoordinates, ...options];
  }, [options, selectedOptionWithCoordinates]);

  useEffect(() => {
    const trimmed = searchValue.trim();

    if (!trimmed) {
      setOptions([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      setLocationStatus('Searching locations...');

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();

        const nextOptions = (Array.isArray(data) ? data : []).map((item) => ({
          value: String(item.place_id),
          label: item.display_name,
          lat: item.lat,
          lon: item.lon,
        }));

        setOptions(nextOptions);
        setLocationStatus(nextOptions.length ? 'Select one result to use its coordinates' : 'No results found');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLocationStatus('Unable to fetch map results right now. Please try again.');
          setOptions([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 450);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  useEffect(() => {
    const latitudeValue = Number(latitude);
    const longitudeValue = Number(longitude);

    if (selectedPlace || !Number.isFinite(latitudeValue) || !Number.isFinite(longitudeValue)) {
      return;
    }

    let isCancelled = false;

    const loadLocationLabel = async () => {
      try {
        const resolvedAddress = await reverseGeocodeFromCoordinates(latitudeValue, longitudeValue);

        if (isCancelled) return;

        const label = resolvedAddress || `Selected coordinates (${latitudeValue.toFixed(5)}, ${longitudeValue.toFixed(5)})`;
        setSelectedPlace({
          value: `coords-${latitudeValue.toFixed(5)}-${longitudeValue.toFixed(5)}`,
          label,
          lat: latitudeValue,
          lon: longitudeValue,
        });
      } catch (error) {
        if (isCancelled) return;

        setSelectedPlace({
          value: `coords-${latitudeValue.toFixed(5)}-${longitudeValue.toFixed(5)}`,
          label: `Selected coordinates (${latitudeValue.toFixed(5)}, ${longitudeValue.toFixed(5)})`,
          lat: latitudeValue,
          lon: longitudeValue,
        });
      }
    };

    loadLocationLabel();

    return () => {
      isCancelled = true;
    };
  }, [latitude, longitude, selectedPlace]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported in this browser');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Detecting your current location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const resolvedAddress = await reverseGeocodeFromCoordinates(lat, lon);
          const label = resolvedAddress || `Current location (${lat.toFixed(5)}, ${lon.toFixed(5)})`;

          applyCoordinates(lat, lon, 'Current location captured', resolvedAddress || null);
          setSelectedPlace({
            value: `current-${Date.now()}`,
            label,
            lat,
            lon,
          });
        } catch (error) {
          const fallbackLabel = `Current location (${lat.toFixed(5)}, ${lon.toFixed(5)})`;
          applyCoordinates(lat, lon, 'Current location captured');
          setSelectedPlace({
            value: `current-${Date.now()}`,
            label: fallbackLabel,
            lat,
            lon,
          });
        } finally {
          setSearchValue('');
          setOptions([]);
          setIsLocating(false);
        }
      },
      () => {
        setLocationStatus('Could not access your location. Please allow permission or use search.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectSearchResult = (value) => {
    const selected = mergedOptions.find((option) => String(option.value) === String(value));
    if (!selected) return;
    setSelectedPlace(selected);
    applyCoordinates(selected.lat, selected.lon, 'Location set from OpenStreetMap search', selected.label);
    setSearchValue('');
  };

  const handleClearLocation = () => {
    setSelectedPlace(null);
    setSearchValue('');
    setOptions([]);
    form.setFieldsValue({
      [latitudeName]: undefined,
      [longitudeName]: undefined,
      [addressFieldName]: undefined,
    });
    setLocationStatus('Location cleared');
  };

  return (
    <Form.Item label={translate(field.label)} required={field.required || false}>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button
          icon={<AimOutlined />}
          onClick={useCurrentLocation}
          loading={isLocating}
          block
        >
          Use my current location
        </Button>

        <Select
          value={selectedOptionWithCoordinates?.value}
          placeholder={field.searchPlaceholder || 'Search village, town, or landmark'}
          options={mergedOptions}
          onSearch={setSearchValue}
          searchValue={searchValue}
          onSelect={handleSelectSearchResult}
          allowClear
          onClear={handleClearLocation}
          loading={isSearching}
          showSearch
          filterOption={false}
          optionLabelProp="label"
          notFoundContent={searchValue.trim() ? (isSearching ? 'Searching...' : 'No locations found') : 'Start typing to search'}
        />

        <Typography.Text type="secondary">Coordinates: {coordinateLabel}</Typography.Text>
        {locationStatus ? <Typography.Text type="secondary">{locationStatus}</Typography.Text> : null}

        {mapPreview ? (
          <iframe
            title="Selected farm location map preview"
            src={mapPreview}
            style={{ width: '100%', height: 220, border: '1px solid #d9d9d9', borderRadius: 8 }}
            loading="lazy"
          />
        ) : null}

        <Form.Item name={latitudeName} hidden>
          <InputNumber />
        </Form.Item>

        <Form.Item name={longitudeName} hidden>
          <InputNumber />
        </Form.Item>
      </Space>
    </Form.Item>
  );
}

function renderSelect(options, props, translate, onChange = null, isTag = false) {
  return (
    <Select {...props} onChange={onChange}>
      {options?.map(option => (
        <Select.Option key={uniqueId()} value={option.value}>
          {isTag ? (
            <Tag bordered={true} color={option.color}>
              {translate(option.label)}
            </Tag>
          ) : (
            translate(option.label)
          )}
        </Select.Option>
      ))}
    </Select>
  );
}
