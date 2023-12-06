import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

const handleReject = () => {
  message.success("Request Rejected!");
};

const Orders = () => {
  const history = useHistory();
  const { dil } = useContext(SebedimContext);
  const [data, setData] = useState([]);
  const [openChange, setOpenChange] = useState(false);
  const [order, setOrder] = useState({});
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(false);
  const [payBefore, setPayBefore] = useState("");
  const [payBeforeType, setPayBeforeType] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/api/admin/all?active=true")
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: dil === "tm" ? "ID" : dil === "ru" ? "ID" : "ID",
      dataIndex: "id",
    },
    {
      title: dil === "tm" ? "Ady" : dil === "ru" ? "Имя" : "First name",
      dataIndex: "name",
    },
    {
      title:
        dil === "tm" ? "Familiýasy" : dil === "ru" ? "Фамилия" : "Last name",
      dataIndex: "lastname",
    },
    {
      title: dil === "tm" ? "Telefon" : dil === "ru" ? "Телефон" : "Phone",
      dataIndex: "phonenumber",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <>
          {/* <Popconfirm placement="top" title={"Are you sure"} onConfirm={handleConfirm} okText="Yes" cancelText="No">  */}
          {/* <Button onClick={()=>{setOpenChange(true);setOrder(record)}} type="primary" style={{borderRadius: "7px"}}>Maglumat</Button> */}
          {/* </Popconfirm> */}
          <Popconfirm
            placement="top"
            title={
              dil === "tm"
                ? "Ynanýarsyňyzmy?"
                : dil === "ru"
                ? "Уверены ли вы?"
                : "Are you sure?"
            }
            onConfirm={() => Reject(record.id)}
            okText={dil === "tm" ? "Howwa" : dil === "ru" ? "Да" : "Yes"}
            cancelText={dil === "tm" ? "ýok" : dil === "ru" ? "Нет" : "No"}
          >
            <Button
              type="danger"
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {dil === "tm"
                ? "işjeň däl"
                : dil === "ru"
                ? "не активен"
                : "dis active"}
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const Reject = (id) => {
    axiosInstance
      .patch("/api/admin/disActive/" + id)
      .then((data) => {
        message.success("Dis Aktiwe Edildi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: "72vh",
        }}
      />
    </>
  );
};

export default Orders;
