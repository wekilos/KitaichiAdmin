import React, { useContext } from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  RiseOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HeartFilled,
  ScheduleOutlined,
  CarOutlined,
  ToolOutlined,
  FileTextOutlined,
  CalculatorOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import logo from "../img/logo.png";
import { SebedimContext } from "../context/sebedim";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderDemo = (props) => {
  const { dil } = useContext(SebedimContext);
  return (
    // <div>
    <Sider
      style={{
        overflow: "auto",
        minHeight: "100vh",
        position: "sticky",
        top: "60px",
        left: 0,
      }}
      className="Sider  "
      width={220}
      trigger={null}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        className="sidebar-left mt-[60px]"
      >
        <SubMenu
          key="sub10"
          title={
            <span className="menuitem">
              <span>Sargytlar</span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="NewOrder">
            <Link to="/orders">Täze Sargytlar</Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="Sargytlar">
            <Link to="/orders">Aktiw Sargytlar</Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="Ýatyrylan">
            <Link to="/orders">Ýatyrylan Sargytlar</Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="Arhiw">
            <Link to="/orders">Arhiw Sargytlar</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub1"
          title={
            <span className="menuitem">
              <span>Marketler</span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="Market Kategory">
            <Link to="/CategoriesOfMarkets">Market Kategory</Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="Marketler">
            <Link to="/markets">Marketler</Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="Brands">
            <Link to="/brands">Brands</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub6"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm"
                  ? "Kategoriýa"
                  : dil === "ru"
                  ? "Категория"
                  : "Category"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="Kategoriýa">
            <Link to="/category">
              {dil === "tm"
                ? "Kategoriýa"
                : dil === "ru"
                ? "Категория"
                : "Category"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="SubKategoriýa">
            <Link to="/subCategory">
              {dil === "tm"
                ? "SubKategoriýa"
                : dil === "ru"
                ? "Категория"
                : "Category"}
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub8"
          title={
            <span className="menuitem">
              <span>
                {dil === "tm" ? "Önüm" : dil === "ru" ? "Продукт" : "Product"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="117">
            <Link to="/products">
              {dil === "tm"
                ? "Önümler"
                : dil === "ru"
                ? " продукты"
                : " products"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="217">
            <Link to="/products">
              {dil === "tm"
                ? "Disactive önümler"
                : dil === "ru"
                ? "Неактивные продукты"
                : "Disactive products"}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="market"
          title={
            <span className="menuitem">
              <span>Reklama</span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="m-carusel">
            <Link to="/m-carusel">
              {dil === "tm" ? "Karusel" : dil === "ru" ? "Карусел" : "Carousel"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="m-baner">
            <Link to="/m-baner">
              {dil === "tm" ? "Baner" : dil === "ru" ? "Банер" : "Banner"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="m-card-carusel">
            <Link to="/card-carusel">
              {dil === "tm"
                ? "Kard-Karusel"
                : dil === "ru"
                ? "Карт-Карусел"
                : "Card-Carousel"}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub9"
          title={
            <span className="menuitem">
              {/* <HomeOutlined /> */}
              <span>
                {dil === "tm"
                  ? "Teklipler"
                  : dil === "ru"
                  ? "Обратная связь"
                  : "Feedback"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="19">
            <Link to="/posts">
              {dil === "tm"
                ? "Gelen Habarlar"
                : dil === "ru"
                ? "Полученные сообщения"
                : "Recived messages"}
            </Link>
          </Menu.Item>
          {/* <Menu.Item className="menuitem menuitem2" key="20">
            <Link to="/sendPost">
              {dil === "tm"
                ? "Ugradylan Habarlar"
                : dil === "ru"
                ? "Отправка сообщений"
                : "Send messages"}
            </Link>
          </Menu.Item> */}
        </SubMenu>

        <SubMenu
          key="sub7"
          title={
            <span>
              <span className="menuitem">
                {dil === "tm"
                  ? "Ulanyjylar"
                  : dil === "ru"
                  ? "Пользователи"
                  : "Users"}
              </span>
            </span>
          }
        >
          <Menu.Item className="menuitem menuitem2" key="ActiveAdmins">
            <Link to="/ActiveAdmins">
              {dil === "tm"
                ? "Adminlar"
                : dil === "ru"
                ? "Пользователи"
                : "Users"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="DisActiveAdmins">
            <Link to="/DisActiveAdmins">
              {dil === "tm"
                ? "Aktiw dal adminlar"
                : dil === "ru"
                ? "Неактивные Пользователи"
                : "Disactive Users"}
            </Link>
          </Menu.Item>

          <Menu.Item className="menuitem menuitem2" key="ActiveSubAdmins">
            <Link to="/ActiveSubAdmins">
              {dil === "tm"
                ? "SubAdminlar"
                : dil === "ru"
                ? "Пользователи"
                : "Users"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="DisActiveSubAdmins">
            <Link to="/DisActiveSubAdmins">
              {dil === "tm"
                ? "Aktiw dal subAdminlar"
                : dil === "ru"
                ? "Неактивные Пользователи"
                : "Disactive Users"}
            </Link>
          </Menu.Item>

          <Menu.Item className="menuitem menuitem2" key="13">
            <Link to="/ActiveUsers">
              {dil === "tm"
                ? "Ulanyjylar"
                : dil === "ru"
                ? "Пользователи"
                : "Users"}
            </Link>
          </Menu.Item>
          <Menu.Item className="menuitem menuitem2" key="14">
            <Link to="/DisActiveUsers">
              {dil === "tm"
                ? "Aktiw dal ulanyjylar"
                : dil === "ru"
                ? "Неактивные Пользователи"
                : "Disactive Users"}
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>

      <div className="admin-footer">
        <center
          style={{
            fontSize: 12,
            color: "#C0C0C0",
            fontWeight: 600,
          }}
        >
          Developed by: <br />a programmer WB
        </center>
      </div>
    </Sider>
  );
};

export default SiderDemo;
