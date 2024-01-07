import DeleteModal from "./DeleteModal";
import SidePanel from "./SidePanel";
import { CrudContextProvider, useCrudContext } from 'contexts/crud';
import TableLayout from "../table/TableLayout";
import CreateForm from "./CreateForm";
import ReadItem from "./ReadItem";
import UpdateForm from "./UpdateForm";


function CrudForm({ config, createForm, updateForm, withUpload }) {
    const { state } = useCrudContext();
    const { isAddBoxOpen, isEditBoxOpen, isReadBoxOpen } = state;

    return (
        isAddBoxOpen ? <CreateForm config={config} formElements={createForm} withUpload={withUpload} />
            : isEditBoxOpen ? <UpdateForm config={config} formElements={updateForm} withUpload={withUpload} />
                : isReadBoxOpen ? <ReadItem config={config} /> : ''
    )

}

export default function CrudLayout({ config, createForm, updateForm, withUpload = false }) {

    return (
        <>
            <CrudContextProvider>
                <SidePanel config={config}>
                    <CrudForm config={config} createForm={createForm} updateForm={updateForm} withUpload={withUpload} />
                </SidePanel>
                <DeleteModal config={config} />
                <TableLayout config={config} />
            </CrudContextProvider>
        </>
    );
}