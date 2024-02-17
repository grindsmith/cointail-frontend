import React, { useState } from 'react';
import { Row, Col, Card, Layout, theme, Typography } from 'antd';
const { Title }  = Typography;

const HeaderCard = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Card bordered={true}>
      <div className="number">
        <Row align="middle" gutter={[24, 0]}>
          <Col xs={18}>
            <span>Group</span>
            <Title level={3} style={{ marginTop: '0'}}>{props.sectionHeader}</Title>
            {props.description ? (<small>{props.description}</small>) : null}
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default HeaderCard;