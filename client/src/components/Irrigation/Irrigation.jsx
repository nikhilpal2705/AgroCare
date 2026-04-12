import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';
import * as constant from "helper/constant";

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
        status: {
            type: 'tag',
            label: 'Status',
            tagWithColor: true,
            required: true,
            options: [
                { value: constant.Status.PENDING, label: 'Pending', color: 'magenta' },
                { value: constant.Status.COMPLETED, label: 'Completed', color: 'green' },
            ],
        },
        waterVolume: {
            label: 'Water Volume (liters)',
            type: 'number',
            placeholder: 'Total water applied',
        },
        waterMethod: {
            label: 'Irrigation Method',
            type: 'select',
            options: [
                { label: 'Drip', value: 'drip' },
                { label: 'Flood', value: 'flood' },
                { label: 'Sprinkler', value: 'sprinkler' },
            ],
        },
        pumpRuntime: {
            label: 'Pump Runtime (hours)',
            type: 'number',
            placeholder: 'Total hours pump ran',
        },
        irrigationCost: {
            label: 'Cost (currency units)',
            type: 'number',
            placeholder: 'Cost of this irrigation event',
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