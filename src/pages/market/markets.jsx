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
  const [name, setName] = useState("");
  const [CategoriesOfMarketId, setCategoriesOfMarketId] = useState(null);
  const [categoriesOfMarkets, setCategoriesOfMarkets] = useState([]);
  const [category, setCategory] = useState({
    name_tm: "",
    name_en: "",
    name_ru: "",
    valyuta: 1,
    delivery_price: 0,
    description_tm: "",
    description_ru: "",
    description_en: "",
    address_tm: "",
    address_ru: "",
    address_en: "",
    tel: "",
    is_cart: false,
    is_online: false,
    is_aksiya: false,
    CategoriesOfMarketId: 0,
  });
  useEffect(() => {
    const time = setTimeout(() => {
      getData();
    }, 500);
    return () => clearTimeout(time);
  }, [active, CategoriesOfMarketId, name]);

  useEffect(() => {
    getCategoriesOfMarkets();
  }, []);

  const getCategoriesOfMarkets = () => {
    axiosInstance
      .get("/api/catOfMarkets/all")
      .then((data) => {
        console.log(data.data);
        setCategoriesOfMarkets(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getData = () => {
    axiosInstance
      .get("/api/market/all", {
        params: {
          active: active == "true" ? true : false,
          deleted: active == "true" ? false : true,
          name: name,
          CategoriesOfMarketId: CategoriesOfMarketId,
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
      title: dil === "tm" ? " No" : dil === "ru" ? " No" : " No",
      width: "70px",
      dataIndex: "orderNum",
    },
    {
      width: "150px",
      title: dil === "tm" ? "Surat" : dil === "ru" ? "Surat" : "Surat",
      render: (text, record) => (
        <div className="w-full">
          <img
            className="w-full object-contain"
            src={BASE_URL + record?.img}
            alt="surat"
          />
        </div>
      ),
    },
    {
      title: dil === "tm" ? "Ady" : dil === "ru" ? "Имя" : "Name",
      dataIndex: dil == "tm" ? "name_tm" : dil == "ru" ? "name_ru" : "name_en",
      render: (text, record) => (
        <div>
          <div>{"Kategory: " + record?.CategoriesOfMarket?.name_tm}</div>
          <div>{"Ady: " + record?.name_tm}</div>
        </div>
      ),
    },
    {
      title:
        dil === "tm"
          ? "Düşündirilişi"
          : dil === "ru"
          ? "Description"
          : "Description",
      dataIndex:
        dil == "tm"
          ? "description_tm"
          : dil == "ru"
          ? "description_ru"
          : "description_tm",
    },
    {
      title: dil === "tm" ? "Salgy" : dil === "ru" ? "Address" : "Address",
      dataIndex:
        dil == "tm" ? "address_tm" : dil == "ru" ? "address_ru" : "address_en",
    },

    {
      title: dil === "tm" ? "Info" : dil === "ru" ? "Info" : "Info",
      dataIndex: "valyuta",
      render: (text, record) => (
        <div className="whitespace-nowrap">
          <h1>Tekefon: {record.tel}</h1>
          <h1>Dastawka: {record.delivery_price}</h1>
          <h1>Valyuta: {record.valyuta}</h1>
          <h1>Cart: {record.is_cart ? "Hawa" : "Ýok"}</h1>
        </div>
      ),
    },

    {
      title: dil === "tm" ? "Hereket" : dil === "ru" ? "Действие" : "Action",
      with: "90px",
      render: (text, record) => (
        <div className="flex flex-col w-fit gap-2 justify-center items-center">
          <Button
            onClick={() => {
              setEdit(true);
              setCategoryEdit(record);
            }}
            type="primary"
            style={{ borderRadius: "7px", width: "100px" }}
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
              style={{
                borderRadius: "7px",
                width: "100px",
              }}
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
      .patch("/api/market/delete/" + id)
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
      .patch("/api/market/unDelete/" + id)
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
    if (order.name_tm && order.name_ru && order.name_en) {
      const formData = new FormData();
      if (files.length > 0) {
        formData.append("img", files[0]);
      }
      formData.append("name_tm", order?.name_tm);
      formData.append("name_ru", order?.name_ru);
      formData.append("name_en", order?.name_en);
      formData.append("description_tm", order?.description_tm);
      formData.append("description_ru", order?.description_ru);
      formData.append("description_en", order?.description_en);
      formData.append("address_tm", order?.address_tm);
      formData.append("address_ru", order?.address_ru);
      formData.append("address_en", order?.address_en);
      formData.append("delivery_price", order?.delivery_price);
      formData.append("valyuta", order?.valyuta);
      formData.append("tel", order?.tel);
      formData.append("is_cart", order?.is_cart);
      formData.append("is_online", order?.is_online);
      formData.append("CategoriesOfMarketId", order?.CategoriesOfMarketId);
      formData.append("id", order?.id);
      formData.append("orderNum", order?.orderNum);
      axiosInstance
        .patch("/api/market/update", formData)
        .then((data) => {
          message.success("Maglumatlar Uytgedildi!");
          getData();
          setCategoryEdit({});
          setEdit(false);

          setFiles([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.warn("Maglumatlary doly Girizin!");
    }
  };

  const CreateCategory = async () => {
    if (category.name_tm && category.name_ru && category.name_en) {
      const formData = new FormData();
      if (files.length > 0) {
        formData.append("img", files[0]);
      }
      formData.append("name_tm", category?.name_tm);
      formData.append("name_ru", category?.name_ru);
      formData.append("name_en", category?.name_en);
      formData.append("description_tm", category?.description_tm);
      formData.append("description_ru", category?.description_ru);
      formData.append("description_en", category?.description_en);
      formData.append("address_tm", category?.address_tm);
      formData.append("address_ru", category?.address_ru);
      formData.append("address_en", category?.address_en);
      formData.append("delivery_price", category?.delivery_price);
      formData.append("valyuta", category?.valyuta);
      formData.append("tel", category?.tel);
      formData.append("is_cart", category?.is_cart);
      formData.append("is_online", category?.is_online);
      formData.append("CategoriesOfMarketId", category?.CategoriesOfMarketId);
      axiosInstance
        .post("/api/market/create", formData)
        .then((data) => {
          message.success("Maglumatlar döredildi!");
          getData();
          setCategory({
            name_tm: "",
            name_en: "",
            name_ru: "",
            valyuta: 1,
            delivery_price: 0,
            description_tm: "",
            description_ru: "",
            description_en: "",
            address_tm: "",
            address_ru: "",
            address_en: "",
            tel: "",
            is_cart: false,
            is_online: false,
            is_aksiya: false,
            CategoriesOfMarketId: 0,
          });
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
          <select
            value={order?.CategoriesOfMarketId}
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            onChange={(e) =>
              setCategoryEdit({
                ...order,
                CategoriesOfMarketId: e.target.value,
              })
            }
          >
            <option value={0} disabled>
              Marketleriň kategoriýasyny saýla!
            </option>
            {categoriesOfMarkets?.map((item, i) => {
              return (
                <option key={"cat" + i} value={item?.id}>
                  {item?.name_tm}
                </option>
              );
            })}
          </select>
          <input
            value={order?.orderNum}
            onChange={(e) =>
              setCategoryEdit({ ...order, orderNum: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="number"
            placeholder="No"
          />
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
          <input
            value={order?.description_tm}
            onChange={(e) =>
              setCategoryEdit({ ...order, description_tm: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Dushundirish tm"
                : dil === "ru"
                ? "Description_tm"
                : "Description_tm"
            }
          />
          <input
            value={order?.description_ru}
            onChange={(e) =>
              setCategoryEdit({ ...order, description_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Dushundirish ru"
                : dil === "ru"
                ? "Dushundirish ru"
                : "Dushundirish ru"
            }
          />
          <input
            value={order?.description_en}
            onChange={(e) =>
              setCategoryEdit({ ...order, description_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Description en"
                : dil === "ru"
                ? "Description ен"
                : "Description en"
            }
          />
          <input
            value={order?.address_tm}
            onChange={(e) =>
              setCategoryEdit({ ...order, address_tm: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Salgy en"
                : dil === "ru"
                ? "Address ен"
                : "Address en"
            }
          />
          <input
            value={order?.address_ru}
            onChange={(e) =>
              setCategoryEdit({ ...order, address_ru: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Salgy ru"
                : dil === "ru"
                ? "Address ru"
                : "Address ru"
            }
          />
          <input
            value={order?.address_en}
            onChange={(e) =>
              setCategoryEdit({ ...order, address_en: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Salgy en"
                : dil === "ru"
                ? "Address ен"
                : "Address en"
            }
          />
          <input
            value={order?.valyuta}
            onChange={(e) =>
              setCategoryEdit({ ...order, valyuta: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Valyuta" : dil === "ru" ? "Valyuta" : "Valyuta"
            }
          />
          <input
            value={order?.delivery_price}
            onChange={(e) =>
              setCategoryEdit({ ...order, delivery_price: e.target.value })
            }
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Dastawka" : dil === "ru" ? "Deliveri" : "Deliveri"
            }
          />
          <input
            value={order?.tel}
            onChange={(e) => setCategoryEdit({ ...order, tel: e.target.value })}
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm"
                ? "Telefon belgi"
                : dil === "ru"
                ? "Phonenumber"
                : "Phonenumber"
            }
          />
          <div className="h-[70px] flex justify-start gap-5 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4">
            <h1 className="w-full">Cartdan söwda edýärmi?</h1>
            <br />
            <div className="w-full cursor-pointer justify-start flex items-center gap-4">
              <div className="flex cursor-pointer gap-3">
                <label className="cursor-pointer" htmlFor="yes1">
                  Hawa
                </label>
                <input
                  className="w-[20px] cursor-pointer"
                  checked={order?.is_cart}
                  onChange={() => setCategoryEdit({ ...order, is_cart: true })}
                  type="radio"
                  id="yes1"
                  name="is_cart"
                />
              </div>
              <div className="flex cursor-pointer gap-3">
                <label className="cursor-pointer" htmlFor="no1">
                  Yok
                </label>
                <input
                  className="w-[20px] cursor-pointer"
                  checked={!order?.is_cart}
                  onChange={() => setCategoryEdit({ ...order, is_cart: false })}
                  type="radio"
                  id="no1"
                  name="is_cart"
                />
              </div>
            </div>
          </div>

          <div className="h-[70px] flex justify-start gap-5 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4">
            <h1 className="w-full">Online söwda edýärmi?</h1>
            <br />
            <div className="w-full cursor-pointer justify-start flex items-center gap-4">
              <div className="flex cursor-pointer gap-3">
                <label className="cursor-pointer" htmlFor="yes">
                  Hawa
                </label>
                <input
                  className="w-[20px] cursor-pointer"
                  checked={order?.is_online}
                  onChange={() =>
                    setCategoryEdit({ ...order, is_online: true })
                  }
                  type="radio"
                  id="yes"
                  name="is_online"
                />
              </div>
              <div className="flex cursor-pointer gap-3">
                <label className="cursor-pointer" htmlFor="no">
                  Yok
                </label>
                <input
                  className="w-[20px] cursor-pointer"
                  checked={!order?.is_online}
                  onChange={() =>
                    setCategoryEdit({ ...order, is_online: false })
                  }
                  type="radio"
                  id="no"
                  name="is_online"
                />
              </div>
            </div>
          </div>

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
        <select
          value={category?.CategoriesOfMarketId}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          onChange={(e) =>
            setCategory({ ...category, CategoriesOfMarketId: e.target.value })
          }
        >
          <option value={0} disabled>
            Marketleriň kategoriýasyny saýla!
          </option>
          {categoriesOfMarkets?.map((item, i) => {
            return (
              <option key={"cattt" + i} value={item?.id}>
                {item?.name_tm}
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
          value={category.description_tm}
          onChange={(e) =>
            setCategory({ ...category, description_tm: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish tm"
              : dil === "ru"
              ? "Description_tm"
              : "Description_tm"
          }
        />
        <input
          value={category.description_ru}
          onChange={(e) =>
            setCategory({ ...category, description_ru: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish ru"
              : dil === "ru"
              ? "Dushundirish ru"
              : "Dushundirish ru"
          }
        />
        <input
          value={category.description_en}
          onChange={(e) =>
            setCategory({ ...category, description_en: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Description en"
              : dil === "ru"
              ? "Description ен"
              : "Description en"
          }
        />
        <input
          value={category.address_tm}
          onChange={(e) =>
            setCategory({ ...category, address_tm: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Salgy en"
              : dil === "ru"
              ? "Address ен"
              : "Address en"
          }
        />
        <input
          value={category.address_ru}
          onChange={(e) =>
            setCategory({ ...category, address_ru: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Salgy ru"
              : dil === "ru"
              ? "Address ru"
              : "Address ru"
          }
        />
        <input
          value={category.address_en}
          onChange={(e) =>
            setCategory({ ...category, address_en: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Salgy en"
              : dil === "ru"
              ? "Address ен"
              : "Address en"
          }
        />
        <input
          value={category.valyuta}
          onChange={(e) =>
            setCategory({ ...category, valyuta: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Valyuta" : dil === "ru" ? "Valyuta" : "Valyuta"
          }
        />
        <input
          value={category.delivery_price}
          onChange={(e) =>
            setCategory({ ...category, delivery_price: e.target.value })
          }
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Dastawka" : dil === "ru" ? "Deliveri" : "Deliveri"
          }
        />
        <input
          value={category.tel}
          onChange={(e) => setCategory({ ...category, tel: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Telefon belgi"
              : dil === "ru"
              ? "Phonenumber"
              : "Phonenumber"
          }
        />
        <div className="h-[70px] flex justify-start gap-5 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4">
          <h1 className="w-full">Cartdan söwda edýärmi?</h1>
          <br />
          <div className="w-full cursor-pointer justify-start flex items-center gap-4">
            <div className="flex cursor-pointer gap-3">
              <label className="cursor-pointer" htmlFor="yes2">
                Hawa
              </label>
              <input
                className="w-[20px] cursor-pointer"
                checked={category.is_cart}
                onChange={() => setCategory({ ...category, is_cart: true })}
                type="radio"
                id="yes2"
                name="is_cart"
              />
            </div>
            <div className="flex cursor-pointer gap-3">
              <label className="cursor-pointer" htmlFor="no2">
                Yok
              </label>
              <input
                className="w-[20px] cursor-pointer"
                checked={!category.is_cart}
                onChange={() => setCategory({ ...category, is_cart: false })}
                type="radio"
                id="no2"
                name="is_cart"
              />
            </div>
          </div>
        </div>

        <div className="h-[70px] flex justify-start gap-5 rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4">
          <h1 className="w-full">Online söwda edýärmi?</h1>
          <br />
          <div className="w-full cursor-pointer justify-start flex items-center gap-4">
            <div className="flex cursor-pointer gap-3">
              <label className="cursor-pointer" htmlFor="yes3">
                Hawa
              </label>
              <input
                className="w-[20px] cursor-pointer"
                checked={category.is_online}
                onChange={() => setCategory({ ...category, is_online: true })}
                type="radio"
                id="yes3"
                name="is_online"
              />
            </div>
            <div className="flex cursor-pointer gap-3">
              <label className="cursor-pointer" htmlFor="no3">
                Yok
              </label>
              <input
                className="w-[20px] cursor-pointer"
                checked={!category.is_online}
                onChange={() => setCategory({ ...category, is_online: false })}
                type="radio"
                id="no3"
                name="is_online"
              />
            </div>
          </div>
        </div>

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
          {dil === "tm" ? "Market" : dil === "ru" ? "Market" : "Market"}
        </h2>
        <div className="w-fit">
          <input
            placeholder="Umumy Gozleg "
            className="h-[40px] min-w-[350px] px-4 outline-none my-[10px] mr-[50px] !rounded-[12px]"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="h-[40px] px-4 outline-none my-[10px] mr-[50px] !rounded-[12px]"
            onChange={(e) => setCategoriesOfMarketId(e.target.value)}
          >
            <option value={0}>Ahlisi</option>
            {categoriesOfMarkets?.map((item, i) => {
              return (
                <option key={"cattttt" + i} value={item?.id}>
                  {item?.name_tm}
                </option>
              );
            })}
          </select>
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
            {dil === "tm" ? " Goşmak" : dil === "ru" ? "Добавить" : "Add "}
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
