import React, { useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
const { Title } = Typography;

const WalletMetricCard = (props) => {
  return (
    <Card bordered={true} className="slds-m-around_xx-small">
      <div className="number">
        <Row  gutter={[24, 0]}>
          <Col xs={24}>
            <span>{props.title}</span>
            <Title level={3} style={{ margin: '0'}}>{props.metric}</Title>
            <Title level={5} style={{ marginTop: '0'}}>
              {props.metricType}
            </Title>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default WalletMetricCard;