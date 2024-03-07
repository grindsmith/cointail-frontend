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
import React, { useState, useEffect } from "react";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { usePathname } from 'next/navigation'

const { Header: AntHeader, Content, Sider } = Layout;

const Main = (props) => {
  const pathname = usePathname();

  const { children } = props;

  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(true);

  return (
    <Layout
      className="layout-dashboard">
      <Drawer
        title={false}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={250}
        className={`drawer-sidebar`}>
        <Layout className={`layout-dashboard`}>
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <Affix>
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              name={pathname || ""}
              subName={props.title ? (props.title) : (pathname || "")}
            />
          </AntHeader>
        </Affix>
        <Content className="content-ant">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Main;
