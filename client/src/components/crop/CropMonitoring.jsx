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
    fieldName: {
      type: 'string',
      label: 'Field Name',
    },
    fieldSize: {
      type: 'string',
      label: 'Field Size',
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
