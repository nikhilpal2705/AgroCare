import { useCrudContext } from 'contexts/crud';
import { Drawer } from 'antd';


export default function SidePanel({ config, children }) {
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose } = state;
  const { panel } = crudContextAction;

  const collapsePanel = () => {
    panel.close();
  };

  return (
    <Drawer
      title={config.ENTITY_TITLE}
      placement="right"
      onClose={collapsePanel}
      open={!isPanelClose}
      width={450}
    >
      <div className="sidePanelContent">
        {children}
      </div>
    </Drawer>
  );
}
