import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';
const PestControl = () => {

  const fields = {
    pestName: {
      label: 'Pest Name',
      type: 'string',
      required: true,
    },
    cropId: {
      type: 'async',
      label: 'Crop Name',
      displayLabels: ['crop', 'cropName'], // will be displayed on dropdown list
      outputValue: ['id'], // will be used to filter on database table
      dataIndex: ['crop', 'cropName'], // will be displayed on table
      entity: 'crop',
      required: true,
    },
    pestiside: {
      type: 'string',
      label: 'Pesticide',
    },
    date: {
      type: 'date',
      label: 'Detection Date',
    },
  };
  let config = {
    fields,
    entity: 'pest',
    ENTITY_TITLE: 'Pest',
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
}

export default PestControl