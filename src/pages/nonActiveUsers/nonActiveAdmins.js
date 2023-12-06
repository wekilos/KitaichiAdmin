import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import file from "../../img/file.png";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";

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
      .get("/api/admin/all?active=false")
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
              type="primary"
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {dil === "tm" ? "işjeň" : dil === "ru" ? "актив" : "active"}
            </Button>
          </Popconfirm>
        </>
      ),
    },

    {
      title: dil === "tm" ? "Öçürmek" : dil === "ru" ? "Удалить" : "Delete",
      render: (text, record) => (
        <>
          <Popconfirm
            placement="top"
            title={
              dil === "tm"
                ? "Ynanýarsyňyzmy?"
                : dil === "ru"
                ? "Уверены ли вы?"
                : "Are you sure?"
            }
            onConfirm={() => Delete(record.id)}
            okText={dil === "tm" ? "Howwa" : dil === "ru" ? "Да" : "Yes"}
            cancelText={dil === "tm" ? "ýok" : dil === "ru" ? "Нет" : "No"}
          >
            <Button
              type="danger"
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {dil === "tm" ? "Öçürmek" : dil === "ru" ? "Удалить" : "Delete"}
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const Reject = (id) => {
    axiosInstance
      .patch("/api/admin/Active/" + id)
      .then((data) => {
        message.success("Dis Aktiwe Edildi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const Delete = (id) => {
    axiosInstance
      .patch("/api/user/delete/" + id)
      .then((data) => {
        message.success("Öçürildi");
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.warn("Gaýtadan barlaň");
      });
  };

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setOpenChange(false)}
        visible={openChange}
      >
        <div>
          <h2 className="mb-0 font-[700]">Maglumat:</h2>
          <p className="mb-0 mt-0">Code: {order?.code}</p>
          <p className="mt-0 mb-0">
            payBefore: {order?.payBefore} {order?.payBeforeType}
          </p>
          <p className="mt-0 mb-0">
            Payment: {order?.payment} {order?.peymentType}
          </p>
          <p
            className={`${
              order?.payment - order?.payBefore > 0
                ? "text-[#ff2a2a]"
                : "text-[#27AE60] "
            } `}
          >
            Balance: {order?.payment - order?.payBefore} {order?.peymentType}
          </p>
          <h2 className="font-[700]">Files:</h2>
          {order?.OrderDocs?.map((item, i) => {
            console.log(BASE_URL + item.fileName);
            return (
              <div
                key={"bl" + item.fileName}
                style={{ width: "100%", display: "flex" }}
              >
                <a href={BASE_URL + "/" + item.fileName} target="_blank">
                  {" "}
                  <img
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      height: "50px",
                    }}
                    src={file}
                    alt="file"
                  />
                </a>
                <p style={{ lineHeight: "50px" }}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </Drawer>
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
