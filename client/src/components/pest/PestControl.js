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
      displayLabels: ['cropName', 'name'],
      dataIndex: ['cropName', 'name'],
      entity: 'crop',
      required: true,
    },
    pestiside: {
      type: 'string',
    },
    date: {
      type: 'date',
    },
  };
  let config = {
    fields,
    entity: 'pest',
    ENTITY_TITLE: 'Pest',
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
}

export default PestControl