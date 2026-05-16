import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';


const CropMonitoring = () => {
  const fields = {
    cropName: {
      type: 'string',
      label: 'Crop Name',
      required: true,
    },
    cropType: {
      type: 'string',
      label: 'Crop Type',
      required: true,
    },
    cropVariety: {
      type: 'string',
      label: 'Crop Variety',
      required: true,
    },
    farmId: {
      type: 'async',
      label: 'Farm',
      displayLabels: ['farmName'],
      outputValue: 'id',
      dataIndex: ['farm', 'farmName'],
      entity: 'farm',
      required: true,
    },
    plantingDate: {
      type: 'date',
      label: 'Planting Date',
      required: true,
      hasFeedback: true,
    },
    harvestDate: {
      label: 'Harvest Date',
      type: 'date',
    },
    cropStage: {
      type: 'select',
      label: 'Current Crop Stage',
      options: [
        { label: 'Seedling', value: 'seedling' },
        { label: 'Vegetative', value: 'vegetative' },
        { label: 'Flowering', value: 'flowering' },
        { label: 'Fruiting', value: 'fruiting' },
        { label: 'Maturity', value: 'maturity' },
      ],
    },
    expectedYield: {
      type: 'number',
      label: 'Expected Yield (kg)',
    },
  };
  let config = {
    fields,
    entity: 'crop',
    ENTITY_TITLE: 'Crop',
  }
  return (
    <>
      <CrudLayout
        config={config}
        createForm={<DynamicForm fields={fields} />}
        updateForm={<DynamicForm fields={fields} />}
      />
    </>
  );
};

export default CropMonitoring;
