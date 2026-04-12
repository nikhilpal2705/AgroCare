import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';

const FarmProfile = () => {

    const fields = {
        farmName: {
            label: 'Farm Name',
            type: 'string',
            required: true,
        },
        address: {
            label: 'Farm Address',
            type: 'string',
        },
        gpsLatitude: {
            label: 'GPS Latitude',
            type: 'number',
            placeholder: 'e.g., 18.5204',
        },
        gpsLongitude: {
            label: 'GPS Longitude',
            type: 'number',
            placeholder: 'e.g., 73.8567',
        },
        totalAreaHectares: {
            label: 'Total Area (Hectares)',
            type: 'number',
        },
        irrigationSource: {
            label: 'Irrigation Source',
            type: 'select',
            options: [
                { label: 'Well', value: 'well' },
                { label: 'Canal', value: 'canal' },
                { label: 'Pond', value: 'pond' },
                { label: 'Borehole', value: 'borehole' },
                { label: 'River', value: 'river' },
                { label: 'Other', value: 'other' },
            ],
        },
    };

    let config = {
        fields,
        entity: 'farm',
        ENTITY_TITLE: 'Farm',
    };

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

export default FarmProfile;
