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

import { useEffect } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  List,
  Avatar,
  Input,
} from "antd";

import {
  SwitcherOutlined,
  SettingOutlined,
  ProfileOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  BellOutlined,
  SearchOutlined,
  WifiOutlined
} from "@ant-design/icons";

import Link from 'next/link';

const Header = (props) => {
  const { name, subName } = props;

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={12}>
          {/* 
          <Breadcrumb>
            <Breadcrumb.Item>Pages</Breadcrumb.Item>
            {name.split("/").slice(1).map((item) => {
              return (
                <Breadcrumb.Item>
                  {item === "/" ? "HOME" : item.charAt(0).toUpperCase() + item.slice(1)}
                </Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
          */}
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName === "/" ? "Home" : subName.split("/").at(-1)}
            </span>
          </div>
        </Col>
        <Col span={24} md={12} className="header-control">
          {/** 
          <Link href="/sign-in" className="btn-sign-in">
            <ProfileOutlined />
            <span>Sign in</span>
          </Link>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
           
          <Badge size="small" count={4}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <BellOutlined />
              </a>
            </Dropdown>
          </Badge>
          */}
        </Col>
      </Row>
    </>
  );
}

export default Header;
