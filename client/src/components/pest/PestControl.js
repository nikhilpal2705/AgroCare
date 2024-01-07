import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';
const PestControl = () => {
  const dataSource = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      age: 30,
    },
  ];

  const fields = {
    firstName: {
      type: 'string',
      disableForForm: false,
      disableForTable: false,
    },
    lastName: {
      type: 'string',
    },
    phone: {
      type: 'phone',
      disableForForm: true,
      disableForTable: true,
    },
    email: {
      type: 'email',
    },
    age: {
      type: 'number',
    },

  };
  let config = {
    fields,
    routeEntity: 'pest',
    ENTITY_TITLE: 'Pest',
    dataSource: dataSource,
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