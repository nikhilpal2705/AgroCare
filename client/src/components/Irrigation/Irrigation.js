import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';
const Irrigation = () => {

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
        scheduledDate: {
            label: 'Scheduled Date',
            type: 'date',
            required: true,
        },
    };
    let config = {
        fields,
        entity: 'irrigation',
        ENTITY_TITLE: 'Irrigation',
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

export default Irrigation