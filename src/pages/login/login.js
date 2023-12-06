import React, { useContext, useState } from "react";
import {
  MailFilled,
  LockFilled,
  EyeFilled,
  EyeInvisibleFilled,
  PhoneFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { message } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

const Login = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [phonenumber, setPhonenumber] = useState("+993");
  const [code, setCode] = useState("");
  const [type, setType] = useState("phone");
  const CheckPhone = () => {
    axiosInstance
      .post("/api/admin/login", {
        phonenumber: phonenumber,
      })
      .then((data) => {
        if (data.data.login) {
          setType("code");
          message.success(data.data.msg);
        } else {
          message.warning(data.data.msg);
          console.log(data.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warn(err.msg);
      });
  };

  const CheckCode = () => {
    axiosInstance
      .post("/api/admin/check", {
        phonenumber: phonenumber,
        code: code,
      })
      .then((data) => {
        console.log(data.data);
        if (data.data.login) {
          message.success(data.data.msg);
          localStorage.setItem("userData", JSON.stringify(data.data));
          history.push({ pathname: "/orders" });
        } else {
          message.warning(data.data.msg);
          console.log(data.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warn(err.msg);
      });
  };
  return (
    <div className="body">
      {/* <h2 className='logo' >Logo</h2> */}
      {type == "phone" && (
        <div className="login-container mt-10 rounded-[8px]">
          <h2 className="h2">
            {dil === "tm"
              ? "Gaýtadan hoş geldiňiz"
              : dil === "ru"
              ? "Добро пожаловать"
              : "Welcome Back"}
          </h2>
          <p className="p">
            {dil === "tm"
              ? "Girmek üçin şahsyýet maglumatlaryňyzy giriziň!"
              : dil === "ru"
              ? "Введите свои учетные данные для доступа!"
              : "Enter your credentials to access!"}
          </p>

          <div className="input-container items-center flex">
            <PhoneFilled className="icon rotate-[100deg]" />
            <input
              onKeyPress={(e) => (e.key == "Enter" ? CheckPhone() : null)}
              className="input items-center flex"
              value={phonenumber}
              type="text"
              autoFocus={type == "phone"}
              style={{ width: "395px" }}
              placeholder={"Telefon belgi"}
              onChange={(e) => {
                e.target.value.length >= 4 &&
                  e.target.value.length <= 12 &&
                  e.target.value.slice(0, 4) == "+993" &&
                  setPhonenumber(e.target.value);
              }}
              required
            />
          </div>

          <button className="button" onClick={() => CheckPhone()}>
            {dil === "tm" ? "Giriň" : dil === "ru" ? "Войти" : "Login"}
          </button>
        </div>
      )}
      {type == "code" && (
        <div className="login-container mt-10 rounded-[8px]">
          <h2 className="h2">
            {dil === "tm"
              ? "Gaýtadan hoş geldiňiz"
              : dil === "ru"
              ? "Добро пожаловать"
              : "Welcome Back"}
          </h2>
          <p className="p">
            {dil === "tm"
              ? "Girmek üçin tassyklaýyş kody giriziň!"
              : dil === "ru"
              ? "Введите свои учетные данные для доступа!"
              : "Enter your credentials to access!"}
          </p>

          <div className="input-container items-center flex">
            <CheckCircleFilled className="icon  " />
            <input
              onKeyPress={(e) => (e.key == "Enter" ? CheckCode() : null)}
              className="input items-center flex text-center"
              value={code}
              type="number"
              autoFocus={type == "phone"}
              style={{ width: "395px" }}
              placeholder={"Tassyklaýyş kody"}
              onChange={(e) => {
                e.target.value.length <= 5 && setCode(e.target.value);
              }}
              required
            />
          </div>

          <button className="button" onClick={() => CheckCode()}>
            {dil === "tm" ? "Giriň" : dil === "ru" ? "Войти" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
