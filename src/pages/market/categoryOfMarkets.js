import { Popconfirm, Table, Button, message, Drawer, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import DropFileInput from "./dropFile";

const Category = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState("true");
  const [category, setCategory] = useState({
    name_tm: "",
    name_en: "",
    name_ru: "",
  });
  useEffect(() => {
    getData();
  }, [active]);

  const getData = () => {
    axiosInstance
      .get("/api/catOfMarkets/all", {
        params: {
          active: active == "true" ? true : false,
          deleted: active == "true" ? false : true,
        },
      })
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
      title: dil === "tm" ? "Surat" : dil === "ru" ? "Surat" : "Surat",
      render: (text, record) => (
        <div className="w-[150px]">
          <img
            className="w-full object-contain"
            src={BASE_URL + record?.img}
            alt="surat"
          />
        </div>
      ),
    },
    {
      title: dil === "tm" ? "Ady tm" : dil === "ru" ? "Имя tm" : "Name tm",
      dataIndex: "name_tm",
    },
    {
      title: dil === "tm" ? "Ady en" : dil === "ru" ? "Имя en" : "Name en",
      dataIndex: "name_en",
    },
    {
      title: dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ru" : "Name ru",
      dataIndex: "name_ru",
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex">
          <Button
            onClick={() => {
              setEdit(true);
              setCategoryEdit(record);
            }}
            type="primary"
            style={{ borderRadius: "7px" }}
          >
            {dil === "tm"
              ? "Maglumat"
              : dil === "ru"
              ? "Информация"
              : "Information"}
          </Button>

          <Popconfirm
            placement="top"
            title={"Are you sure"}
            onConfirm={() => {
              active == "true"
                ? DeleteCategory(record.id)
                : UnDeleteCategory(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type={active == "true" ? "danger" : "success"}
              className={active == "true" ? "" : "!bg-[#26a92d] !text-white"}
              style={{ borderRadius: "7px", marginLeft: "10px" }}
            >
              {active == "true" ? "Öçürmek" : "Gaýtarmak"}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const DeleteCategory = (id) => {
    console.log(id);
    axiosInstance
      .patch("/api/catOfMarkets/delete/" + id)
      .then((data) => {
        console.log(data.data);
        message.success("Öçürildi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const UnDeleteCategory = (id) => {
    console.log(id);
    axiosInstance
      .patch("/api/catOfMarkets/unDelete/" + id)
      .then((data) => {
        console.log(data.data);
        message.success("Gaýtaryldy!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };
  const editData = async () => {
    const formData = new FormData();

    files.length > 0 && formData.append("img", files[0]);

    formData.append("name_tm", order?.name_tm);
    formData.append("name_ru", order?.name_ru);
    formData.append("name_en", order?.name_en);
    formData.append("id", order?.id);
    axiosInstance
      .patch("/api/catOfMarkets/update", formData)
      .then((data) => {
        message.success("Maglumatlar Uytgedildi!");
        getData();
        setCategoryEdit();
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateCategory = async () => {
    if (category.name_tm && category.name_ru && category.name_en) {
      const formData = new FormData();
      await files.map((file) => {
        formData.append("img", file);
      });
      formData.append("name_tm", category?.name_tm);
      formData.append("name_ru", category?.name_ru);
      formData.append("name_en", category?.name_en);
      axiosInstance
        .post("/api/catOfMarkets/create", formData)
        .then((data) => {
          message.success("Maglumatlar döredildi!");
          getData();
          setCategory({ name_tm: "", name_en: "", name_ru: "" });
          setFiles([]);
          setGosh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.warn("Maglumatlary doly Girizin!");
    }
  };

  const onFileChange = (files) => {
    console.log(files);
    setFiles(files);
  };

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => {
          setEdit(false);
        }}
        visible={edit}
      >
        <div style={{ width: "100%" }}>
          <input
            value={order?.name_tm}
            onChange={(e) =>
              setCategoryEdit({ ...order, name_tm: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady tm" : dil === "ru" ? "Имя tm" : "Name tm"
            }
          />
          <input
            value={order?.name_ru}
            onChange={(e) =>
              setCategoryEdit({ ...order, name_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
            }
          />
          <input
            value={order?.name_en}
            onChange={(e) =>
              setCategoryEdit({ ...order, name_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
            }
          />

          <DropFileInput onFileChange={(files) => onFileChange(files)} />
          <button
            onClick={() => {
              editData();
            }}
            className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
          >
            {dil === "tm" ? "Üýtgetmek" : dil === "ru" ? "Изменять" : "Change"}
          </button>
        </div>
      </Drawer>

      <Drawer
        width={500}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setGosh(false)}
        visible={gosh}
      >
        <input
          value={category.name_tm}
          onChange={(e) =>
            setCategory({ ...category, name_tm: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady tm" : dil === "ru" ? "Имя tm" : "Name tm"
          }
        />
        <input
          value={category.name_ru}
          onChange={(e) =>
            setCategory({ ...category, name_ru: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
          }
        />
        <input
          value={category.name_en}
          onChange={(e) =>
            setCategory({ ...category, name_en: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
          }
        />

        <DropFileInput onFileChange={(files) => onFileChange(files)} />
        <button
          onClick={() => {
            CreateCategory();
          }}
          className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
        </button>
      </Drawer>
      <div className="w-full h-[50px] mb-4 p-0 flex justify-between ">
        <h2 className="leading-[50px] ml-[50px] text-sans text-[24px]">
          {dil === "tm"
            ? "Kategoriýa"
            : dil === "ru"
            ? "Категория"
            : "Category"}
        </h2>
        <div>
          <select
            className="h-[40px] px-4 outline-none my-[10px] mr-[50px] !rounded-[12px]"
            onChange={(e) => setActive(e.target.value)}
          >
            <option value={true}>Active</option>
            <option value={false}>Deleted</option>
          </select>
          <Button
            onClick={() => {
              setGosh(true);
            }}
            className="!h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
            type="primary"
          >
            {dil === "tm"
              ? "Kategoriýa Goşmak"
              : dil === "ru"
              ? "Добавить Категория"
              : "Add Category"}
          </Button>
        </div>
      </div>
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

export default Category;
