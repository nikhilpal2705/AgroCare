import DeleteModal from "./DeleteModal";
import SidePanel from "./SidePanel";
import { CrudContextProvider, useCrudContext } from 'contexts/crud';
import TableLayout from "../table/TableLayout";
import CreateForm from "./CreateForm";
import ReadItem from "./ReadItem";
import UpdateForm from "./UpdateForm";
import { Button, Form } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';


function CrudPanel({ config, createForm, updateForm, withUpload }) {
    const { state } = useCrudContext();
    const { isAddBoxOpen, isEditBoxOpen, isReadBoxOpen } = state;

    const [form] = Form.useForm();
    const { crudContextAction } = useCrudContext();
    const { panel, addBox, editBox } = crudContextAction;

    const handleCancel = () => {
        panel.close();
        addBox.close();
        editBox.close();
        form.resetFields();
    };

    const footer = isAddBoxOpen || isEditBoxOpen ? (
        <div className="crud-form-footer">
            <Button onClick={handleCancel} icon={<CloseCircleOutlined />}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()} icon={<SaveOutlined />}>
                {isAddBoxOpen ? 'Submit' : 'Save'}
            </Button>
        </div>
    ) : null;

    let content = '';

    if (isAddBoxOpen) {
        content = <CreateForm config={config} form={form} formElements={createForm} withUpload={withUpload} />;
    } else if (isEditBoxOpen) {
        content = <UpdateForm config={config} form={form} formElements={updateForm} withUpload={withUpload} />;
    } else if (isReadBoxOpen) {
        content = <ReadItem config={config} />;
    }

    return (
        <SidePanel config={config} footer={footer}>
            {content}
        </SidePanel>
    )

}

export default function CrudLayout({ config, createForm, updateForm, withUpload = false }) {

    return (
        <>
            <CrudContextProvider>
                <CrudPanel config={config} createForm={createForm} updateForm={updateForm} withUpload={withUpload} />
                <DeleteModal config={config} />
                <TableLayout config={config} />
            </CrudContextProvider>
        </>
    );
}