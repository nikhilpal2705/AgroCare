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
      renderAsTag: true,
      options: [
        { label: 'Seedling', value: 'seedling', color: 'lime' },
        { label: 'Vegetative', value: 'vegetative', color: 'green' },
        { label: 'Flowering', value: 'flowering', color: 'magenta' },
        { label: 'Fruiting', value: 'fruiting', color: 'gold' },
        { label: 'Maturity', value: 'maturity', color: 'volcano' },
      ],
    },
    expectedYield: {
      type: 'number',
      label: 'Expected Yield (kg)',
    },
    diseaseHistory: {
      type: 'textarea',
      label: 'Disease History',
      placeholder: 'Record of past diseases, treatments, or observations',
      disableForTable: true,
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
