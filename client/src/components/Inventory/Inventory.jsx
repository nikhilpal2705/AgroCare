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
        category: {
            label: 'Category',
            type: 'select',
            options: [
                { label: 'Seeds', value: 'seeds' },
                { label: 'Fertilizer', value: 'fertilizer' },
                { label: 'Pesticide', value: 'pesticide' },
                { label: 'Tools', value: 'tools' },
            ],
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
        supplier: {
            label: 'Supplier Name',
            type: 'string',
            placeholder: 'Name of supplier or vendor',
        },
        costPerUnit: {
            label: 'Cost Per Unit (Currency)',
            type: 'number',
            placeholder: 'Price per kg or unit',
        },
        expiryDate: {
            label: 'Expiry Date',
            type: 'date',
        },
        minimumThreshold: {
            label: 'Minimum Threshold (Kg.)',
            type: 'number',
            placeholder: 'Alert when stock falls below this',
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