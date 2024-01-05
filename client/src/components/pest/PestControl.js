import React from 'react'
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
    {
      key: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '3',
      firstName: 'Jane',
      lastName: 'Smith3',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '4',
      firstName: 'Jane',
      lastName: 'Smith4',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '5',
      firstName: 'Jane',
      lastName: 'Smith5',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '6',
      firstName: 'Jane',
      lastName: 'Smith6',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '7',
      firstName: 'Jane',
      lastName: 'Smith7',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '8',
      firstName: 'Jane',
      lastName: 'Smith8',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '9',
      firstName: 'Jane',
      lastName: 'Smith9',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '10',
      firstName: 'Jane',
      lastName: 'Smith10',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '11',
      firstName: 'Jane',
      lastName: 'Smith11',
      email: 'jane@example.com',
      age: 25,
    },
    {
      key: '12',
      firstName: 'Jane',
      lastName: 'Smith12',
      email: 'jane@example.com',
      age: 25,
    },
  ];
  const labels = {
    DATATABLE_TITLE: 'Pest List',
    ADD_NEW_ENTITY: 'Add Pest',
    PANEL_TITLE: 'Pest'
  }

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
    ...labels,
    fields,
    dataSource: dataSource,
    routeName: 'pest'
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