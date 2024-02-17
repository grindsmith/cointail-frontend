/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product pathname: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from "react";
import { Menu, Button, Space, Switch,Typography, Row, Col } from "antd";
import Link from 'next/link'

import { usePathname } from "next/navigation";
const logo = "/images/logo.png";
import { 
  UserOutlined, 
  CreditCardOutlined, 
  ProfileOutlined, 
  TableOutlined, 
  HomeFilled 
} from "@ant-design/icons";

const { Title } = Typography;

const Sidenav = (props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="brand">
        <span>CoinTail</span>
      </div>
      <hr />
      
      <Menu theme="light" mode="inline">
        <Menu.Item className="menu-item-header" key="5">
          Explorer
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="/">
            <span
              className="icon"
              style={{
                background: pathname === "/" ? '#fff' : "",
              }}
            >
              <HomeFilled />
            </span>
            <span className="label">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/groups">
            <span
              className="icon"
              style={{
                background: pathname === "/groups" ? "#fff" : "",
              }}
            >
              <TableOutlined />
            </span>
            <span className="label">Groups</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/wallets">
            <span
              className="icon"
              style={{
                background: pathname === "wallets" ? "#fff" : "",
              }}
            >
              <CreditCardOutlined />
            </span>
            <span className="label">Wallets</span>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
