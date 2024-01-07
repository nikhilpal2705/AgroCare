import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';


const CropMonitoring = () => {
  const fields = {
    name: {
      type: 'string',
    },
    cropType: {
      type: 'string',
    },
    cropVariety: {
      type: 'string',
    },
    fieldName: {
      type: 'string',
    },
    fieldSize: {
      type: 'string',
    },
    plantingDate: {
      type: 'date',
    },
    harvestDate: {
      type: 'date',
    },

  };
  let config = {
    fields,
    routeEntity: 'crop',
    ENTITY_TITLE: 'Crop',
    dataSource: [],
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
