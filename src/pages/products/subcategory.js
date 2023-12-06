import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import DropFileInput from "./dropFile";

const SubCategory = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState({ active: true });
  const [category, setCategory] = useState({
    name_tm: "",
    name_en: "",
    name_ru: "",
    orderNum: null,
    MarketId: 0,
    CategoryId: 0,
  });
  useEffect(() => {
    getData();
    getMarkets();
    getCategories();
  }, []);
  useEffect(() => {
    getData();
  }, [filter]);

  const getData = () => {
    axiosInstance
      .get("/api/subCategory/all", {
        params: {
          active: filter.active,
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

  const getMarkets = () => {
    axiosInstance
      .get("/api/market/all")
      .then((data) => {
        console.log(data.data);
        setMarkets(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategories = () => {
    axiosInstance
      .get("/api/category/all")
      .then((data) => {
        console.log(data.data);
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: dil === "OrderNo",
      dataIndex: "orderNum",
    },
    {
      title: dil === "tm" ? "Ady en" : dil === "ru" ? "Имя en" : "Name en",
      dataIndex: dil == "tm" ? "name_tm" : dil == "ru" ? "name_ru" : "name_en",
    },
    {
      title: "Market",
      render: (text, record) => (
        <div className="flex flex-wrap">
          <h1 className="w-full"> Market: {record?.Market?.name_tm} </h1>
          <h1 className="w-full"> Category: {record?.Category?.name_tm}</h1>
        </div>
      ),
    },

    {
      title: "Surat",
      render: (text, record) => (
        <div>
          <img src={BASE_URL + record?.img} />
        </div>
      ),
    },
    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      render: (text, record) => (
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => {
              setEdit(true);
              setCategory(record);
            }}
            type="primary"
          >
            {dil === "tm"
              ? "Maglumat"
              : dil === "ru"
              ? "Информация"
              : "Information"}
          </Button>

          {!record.active && (
            <Button
              onClick={() => {
                unDeleteCategory(record.id);
              }}
              type="primary"
            >
              {dil === "tm" ? "Aktive" : dil === "ru" ? "Актив" : "Aktive"}
            </Button>
          )}
          <Popconfirm
            placement="top"
            title={"Are you sure"}
            onConfirm={() =>
              record.active
                ? DeleteCategory(record.id)
                : DestroyCategory(record.id)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              {dil === "tm" ? "Öçürmek" : dil === "ru" ? "Удалит" : "Delete"}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const DeleteCategory = (id) => {
    axiosInstance
      .patch("/api/subCategory/delete/" + id)
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

  const unDeleteCategory = (id) => {
    axiosInstance
      .patch("/api/subCategory/unDelete/" + id)
      .then((data) => {
        console.log(data.data);
        message.success("Aktiwlendi!");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.warn("Gaytadan Barlan!");
      });
  };

  const DestroyCategory = (id) => {
    axiosInstance
      .delete("/api/subCategory/destroy/" + id)
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

  const editData = () => {
    const formData = new FormData();

    files.length > 0 && formData.append("img", files[0]);

    formData.append("name_tm", category.name_tm);
    formData.append("name_ru", category.name_ru);
    formData.append("name_en", category.name_en);
    formData.append("orderNum", category.orderNum);
    formData.append("MarketId", category.MarketId);
    formData.append("CategoryId", category.CategoryId);
    formData.append("id", category.id);

    axiosInstance
      .patch("/api/subCategory/update", formData)
      .then((data) => {
        console.log(data.data);
        message.success("Maglumatlar Uytgedildi!");
        getData();
        setCategory({
          name_tm: "",
          name_en: "",
          name_ru: "",
          orderNum: null,
          MarketId: 0,
          CategoryId: 0,
        });
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateCategory = () => {
    if (
      category.name_tm &&
      category.name_ru &&
      category.name_en &&
      category.MarketId
    ) {
      const formData = new FormData();

      files.length > 0 && formData.append("img", files[0]);

      formData.append("name_tm", category.name_tm);
      formData.append("name_ru", category.name_ru);
      formData.append("name_en", category.name_en);
      // formData.append("orderNum", category.orderNum);
      formData.append("MarketId", category.MarketId);
      formData.append("CategoryId", category.CategoryId);

      axiosInstance
        .post("/api/subCategory/create", formData)
        .then((data) => {
          console.log(data.data);
          message.success("Maglumatlar döredildi!");
          getData();
          setCategory({
            name_tm: "",
            name_en: "",
            name_ru: "",
            orderNum: null,
            MarketId: 0,
            CategoryId: 0,
          });
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
        onClose={() => setEdit(false)}
        visible={edit}
      >
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={category.MarketId}
          onChange={(e) =>
            setCategory({ ...category, MarketId: e.target.value })
          }
        >
          <option disabled value={0}>
            Market
          </option>
          {markets?.map((item, i) => {
            return (
              <option key={"cattttt" + i} value={item?.id}>
                {dil == "tm"
                  ? item?.name_tm
                  : dil == "ru"
                  ? item?.name_ru
                  : item?.name_en}
              </option>
            );
          })}
        </select>
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={category.CategoryId}
          onChange={(e) =>
            setCategory({ ...category, CategoryId: e.target.value })
          }
        >
          <option disabled value={0}>
            Category
          </option>
          {categories?.map((item, i) => {
            return (
              <option key={"cattttt" + i} value={item?.id}>
                {dil == "tm"
                  ? item?.name_tm
                  : dil == "ru"
                  ? item?.name_ru
                  : item?.name_en}
              </option>
            );
          })}
        </select>
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

        <input
          value={category.orderNum}
          onChange={(e) =>
            setCategory({ ...category, orderNum: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Tertip No" : dil === "ru" ? "Order No" : "Order No"
          }
        />

        <DropFileInput onFileChange={(files) => onFileChange(files)} />

        <button
          onClick={() => {
            editData();
          }}
          className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
        >
          {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
        </button>
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
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={category.MarketId}
          onChange={(e) =>
            setCategory({ ...category, MarketId: e.target.value })
          }
        >
          <option disabled value={0}>
            Market
          </option>
          {markets?.map((item, i) => {
            return (
              <option key={"cattttt" + i} value={item?.id}>
                {dil == "tm"
                  ? item?.name_tm
                  : dil == "ru"
                  ? item?.name_ru
                  : item?.name_en}
              </option>
            );
          })}
        </select>
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={category.CategoryId}
          onChange={(e) =>
            setCategory({ ...category, CategoryId: e.target.value })
          }
        >
          <option disabled value={0}>
            Category
          </option>
          {categories?.map((item, i) => {
            return (
              <option key={"cattttt" + i} value={item?.id}>
                {dil == "tm"
                  ? item?.name_tm
                  : dil == "ru"
                  ? item?.name_ru
                  : item?.name_en}
              </option>
            );
          })}
        </select>
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

      <div className="w-full h-[50px] gap-4 p-0 flex justify-between ">
        <h2 className="leading-[50px] ml-[50px] text-sans text-[24px]">
          {dil === "tm"
            ? "Kategoriýa"
            : dil === "ru"
            ? "Категория"
            : "Category"}
        </h2>
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={filter.active}
          onChange={(e) => setFilter({ ...filter, active: e.target.value })}
        >
          <option key={"cataktiwwe"} value={true}>
            Active
          </option>
          <option key={"catDisactive"} value={false}>
            Disactive
          </option>
        </select>
        <Button
          onClick={() => {
            setGosh(true);
          }}
          className="h-[40px] mt-[10px] mr-[50px] !rounded-[12px]"
          type="primary"
        >
          {dil === "tm" ? "Goşmak" : dil === "ru" ? "Добавить " : "Add "}
        </Button>
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

export default SubCategory;
