import DynamicForm from 'layout/crud/DynamicForm';
import CrudLayout from 'layout/crud/CrudLayout';

const FarmProfile = () => {

    const fields = {
        farmName: {
            label: 'Farm Name',
            type: 'string',
            required: true,
        },
        gpsLatitude: {
            label: 'Farm Location',
            readLabel: 'GPS Latitude',
            type: 'geolocation',
            longitudeFieldName: 'gpsLongitude',
            addressFieldName: 'address',
            searchPlaceholder: 'Search village, town, or landmark',
            disableForTable: true,
        },
        address: {
            label: 'Farm Address',
            type: 'string',
        },
        gpsLongitude: {
            label: 'GPS Longitude',
            readLabel: 'GPS Longitude',
            type: 'number',
            placeholder: 'e.g., 73.8567',
            disableForForm: true,
            disableForTable: true,
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
        readFieldOrder: [
            'farmName',
            'address',
            'totalAreaHectares',
            'irrigationSource',
            'gpsLatitude',
            'gpsLongitude',
        ],
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
