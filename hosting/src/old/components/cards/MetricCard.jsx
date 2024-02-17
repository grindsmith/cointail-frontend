import React, { useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
const { Title } = Typography;

const MetricCard = (props) => {
  return (
    <Card bordered={true}>
      <div className="number">
        <Row  gutter={[24, 0]}>
          <Col xs={12}>
            <span>{props.title}</span>
            <div>{props.percent ? (<small>{props.percent}% of Portfolio</small>) : null}</div>
          </Col>
          <Col xs={12}>
            <Title level={3} style={{ marginTop: '0'}}>
              {props.symbol}{props.amount} 
            </Title>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default MetricCard;