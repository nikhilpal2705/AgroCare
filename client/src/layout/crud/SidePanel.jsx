import { useCrudContext } from 'contexts/crud';
import { Drawer } from 'antd';

export default function SidePanel({ config, children, footer, onClose }) {
  const { state } = useCrudContext();
  const { isPanelClose } = state;

  return (
    <Drawer
      title={config.ENTITY_TITLE}
      placement="right"
      onClose={onClose}
      open={!isPanelClose}
      width={450}
      footer={footer}
    >
      <div className="sidePanelContent">
        {children}
      </div>
    </Drawer>
  );
}
