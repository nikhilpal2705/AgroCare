import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';
const Inventory = () => {

    const fields = {
        cropId: {
            label: 'Crop Name',
            type: 'async',
            displayLabels: ['crop', 'cropName'], // will be displayed on dropdown list
            outputValue: ['id'], // will be used to filter on database table
            dataIndex: ['crop', 'cropName'], // will be displayed on table
            entity: 'crop',
            required: true,
        },
        totalStock: {
            label: 'Total Stock (Kg.)',
            type: 'number',
            required: true,
        },
        availableStock: {
            label: 'Available Stock (Kg.)',
            type: 'number',
        },
        updatedAt: {
            label: 'Last Updated',
            type: 'date',
            disableForForm: true,
        },
    };
    let config = {
        fields,
        entity: 'inventory',
        ENTITY_TITLE: 'Inventory',
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

export default Inventory