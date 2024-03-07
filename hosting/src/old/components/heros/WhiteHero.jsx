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
import { Card, Typography } from "antd";

const Hero1 = (props) => {
  const { Title } = Typography;

  return (
    <Card bordered={props.bordered || false} className="criclebox card-info-2">
      <div className="gradent col-content">
        <div className="card-content">
          <Title level={5}>{props.title}</Title>
          <p>{props.description}</p>
        </div>
      </div>
    </Card>
  );
}

export default Hero1;
