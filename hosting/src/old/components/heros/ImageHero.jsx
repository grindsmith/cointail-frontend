/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react';
import { Card, Row, Col, Typography } from "antd";

const Hero2 = (props) => {
  const { Text, Title, Paragraph } = Typography;

  return (
    <Card bordered={props.bordered || false} className="criclebox">
      <Row>
        <Col
          xs={24}
          md={12}
          sm={24}
          lg={12}
          xl={14}
          className="mobile-24"
        >
          <div className="h-full">
            <div className="ant-muse">
              <Text>{props.subTitle}</Text>
              <Title level={5}>{props.title}</Title>
              <Paragraph className="lastweek" style={{ marginBottom: '0px' }}>
                {props.description}
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default Hero2;