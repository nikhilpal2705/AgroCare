import { useState, useEffect } from 'react';
import { useCrudContext } from 'contexts/crud';
import { Drawer } from 'antd';
import CollapseBox from './CollapseBox';


export default function SidePanel({ config, topContent, bottomContent, fixHeaderPanel }) {


  const { ADD_NEW_ENTITY } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;
  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);
  const [leftSider, setLeftSider] = useState('-1px');
  const [opacitySider, setOpacitySider] = useState(0);
  const [paddingTopSider, setPaddingTopSider] = useState('20px');

  useEffect(() => {
    let timer = [];
    if (isPanelClose) {
      setOpacitySider(0);
      setPaddingTopSider('20px');

      timer = setTimeout(() => {
        setLeftSider('-1px');
        setSidePanel(isPanelClose);
      }, 200);
    } else {
      setSidePanel(isPanelClose);
      setLeftSider(0);
      timer = setTimeout(() => {
        setOpacitySider(1);
        setPaddingTopSider(0);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [isPanelClose]);

  const collapsePanel = () => {
    panel.collapse();
  };



  return (
    <Drawer
      title={config.PANEL_TITLE}
      placement="right"
      onClose={collapsePanel}
      open={!isPanelClose}
      width={450}
    >
      <div
        className="sidePanelContent"
        style={{
          opacity: opacitySider,
          paddingTop: paddingTopSider,
        }}
      >
        {fixHeaderPanel}
        <CollapseBox
          bottomContent={bottomContent}
        ></CollapseBox>
      </div>
    </Drawer>
  );
}
