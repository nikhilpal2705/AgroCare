import SidePanel from "./SidePanel";

export default function CrudLayout({ config, createForm, updateForm }) {
    return (
        <SidePanel
            config={config}
            // bottomContent={<CreateForm config={config} formElements={createForm} />}
        ></SidePanel>
    );
}