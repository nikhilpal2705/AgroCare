import React from 'react';
import { Row, Col } from 'antd';

export default function CollapseBox({ bottomContent }) {
  return (
    <>
      <div className="BottomCollapseBox">
        <div>
          <Row>
            <Col span={24}> {bottomContent}</Col>
          </Row>
        </div>
      </div>
    </>
  );
}
