import { Popconfirm, Table, Button, message, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { SebedimContext } from "../../context/sebedim";
import DropFileInput from "./dropFile";

const Product = () => {
  const { dil } = useContext(SebedimContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [editVideo, setEditVideo] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [markets, setMarkets] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [order, setCategoryEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [gosh, setGosh] = useState(false);
  const [files, setFiles] = useState([]);
  const [videFiles, setVideoFiles] = useState([]);
  const [filter, setFilter] = useState({ active: true });
  const [product, setProduct] = useState({
    name_tm: "",
    name_en: "",
    name_ru: "",
    description_ru: "",
    description_tm: "",
    description_en: "",
    price: 0,
    usd_price: 0,
    is_discount: false,
    is_valyuta: false,
    discount: 0,
    discount_price: 0,
    discount_usd: 0,
    quantity: 0,
    massa: "",
    on_hand: true,
    is_selected: false,
    is_favorite: false,
    is_top: false,
    code: "",
    is_moresale: false,
    link: "",
    orderNum: null,
    MarketId: 0,
    CategoryId: 0,
    SubCategoryId: 0,
    BrandId: 0,
  });
  useEffect(() => {
    getData();
    getMarkets();
    getSubCategories();
    getCategories();
    getBrands();
  }, []);
  useEffect(() => {
    getData();
  }, [filter]);

  const getData = () => {
    axiosInstance
      .get("/api/product/all", {
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
  const getBrands = () => {
    axiosInstance
      .get("/api/brand/all")
      .then((data) => {
        console.log(data.data);
        setBrands(data.data);
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
  const getSubCategories = () => {
    axiosInstance
      .get("/api/subCategory/all")
      .then((data) => {
        console.log(data.data);
        setSubCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "OrderNo",
      dataIndex: "orderNum",
      width: "8%",
    },
    {
      title: dil === "tm" ? "Ady " : dil === "ru" ? "Имя " : "Name ",
      dataIndex: dil == "tm" ? "name_tm" : dil == "ru" ? "name_ru" : "name_en",
    },
    {
      title: dil === "tm" ? "Baha " : dil === "ru" ? "Цена " : "Price ",
      dataIndex: dil == "tm" ? "name_tm" : dil == "ru" ? "name_ru" : "name_en",
      render: (text, record) => (
        <div>
          {record.is_valyuta ? (
            <h1>Baha: {record.usd_price} USD</h1>
          ) : (
            <h1>Baha: {record.price} TMT</h1>
          )}
          {record.is_valyuta
            ? record.is_discount && (
                <h1>Skidka Baha: {record.discount_usd} USD</h1>
              )
            : record.is_discount && <h1>Baha: {record.price} TMT</h1>}
        </div>
      ),
    },
    {
      title:
        dil === "tm"
          ? "Dushundirish "
          : dil === "ru"
          ? "Описаниа "
          : "Description ",
      dataIndex:
        dil == "tm"
          ? "description_tm"
          : dil == "ru"
          ? "description_ru"
          : "description_en",
    },
    {
      title: "Market",
      render: (text, record) => (
        <div className="flex flex-wrap ">
          <h1 className="w-full font-[700]">
            Market: {record?.Market?.name_tm}
          </h1>
          <h1 className="w-full font-[700]">Brand: {record?.Brand?.name_tm}</h1>
          <h1 className="w-full font-[700]">
            Category: {record?.Category?.name_tm}
          </h1>
          <h1 className="w-full font-[700]">
            SubCategory: {record?.SubCategory?.name_tm}
          </h1>
        </div>
      ),
    },

    {
      title: "Surat",
      render: (text, record) => (
        <div className="flex w-full gap-2 overflow-x-auto scrollbar-hide">
          {record.ProductImgs?.map((img) => {
            return (
              <img
                className="w-[80%] object-contain"
                src={BASE_URL + img.src}
              />
            );
          })}
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
              setProduct(record);
            }}
            type="primary"
          >
            {dil === "tm"
              ? "Maglumat"
              : dil === "ru"
              ? "Информация"
              : "Information"}
          </Button>
          <Button
            onClick={() => {
              setEditVideo(true);
              setProduct(record);
            }}
            type="primary"
          >
            video
          </Button>
          <Button
            onClick={() => {
              setEditImg(true);
              setProduct(record);
            }}
            type="primary"
          >
            Surat
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
      .patch("/api/product/delete/" + id)
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
      .patch("/api/product/unDelete/" + id)
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
      .delete("/api/product/destroy/" + id)
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

    formData.append("name_tm", product.name_tm);
    formData.append("name_ru", product.name_ru);
    formData.append("name_en", product.name_en);
    formData.append("description_tm", product.description_tm);
    formData.append("description_ru", product.description_ru);
    formData.append("description_en", product.description_en);
    formData.append("price", product.price);
    formData.append("is_valyuta", product.is_valyuta);
    formData.append("usd_price", product.usd_price);
    formData.append("is_discount", product.is_discount);
    formData.append("discount", product.discount);
    formData.append("discount_price", product.discount_price);
    formData.append("discount_usd", product.discount_usd);
    formData.append("quantity", product.quantity);
    formData.append("massa", product.massa);
    formData.append("on_hand", product.on_hand);
    formData.append("code", product.code);
    formData.append("link", product.link);
    formData.append("orderNum", product.orderNum);
    formData.append("is_moresale", product.is_moresale);
    formData.append("is_favorite", product.is_favorite);
    formData.append("is_selected", product.is_selected);
    formData.append("is_top", product.is_top);
    formData.append("MarketId", product.MarketId);
    formData.append("CategoryId", product.CategoryId);
    formData.append("SubCategoryId", product.SubCategoryId);
    formData.append("BrandId", product.BrandId);
    formData.append("id", product.id);

    axiosInstance
      .patch("/api/product/update", formData)
      .then((data) => {
        console.log(data.data);
        message.success("Maglumatlar Uytgedildi!");
        getData();
        setProduct({
          name_tm: "",
          name_en: "",
          name_ru: "",
          description_ru: "",
          description_tm: "",
          description_en: "",
          price: 0,
          usd_price: 0,
          is_discount: false,
          is_valyuta: false,
          discount: 0,
          discount_price: 0,
          discount_usd: 0,
          quantity: 0,
          massa: "",
          on_hand: true,
          is_selected: false,
          is_favorite: false,
          is_top: false,
          code: "",
          is_moresale: false,
          link: "",
          orderNum: null,
          MarketId: 0,
          CategoryId: 0,
          SubCategoryId: 0,
          BrandId: 0,
        });
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateCategory = () => {
    if (
      product.name_tm &&
      product.name_ru &&
      product.name_en &&
      product.MarketId &&
      product.CategoryId
    ) {
      const formData = new FormData();

      if (files.length > 0) {
        files.map((file) => {
          formData.append("img", file);
        });
      }
      // if (videFiles.length > 0) {
      //   videFiles.map((file) => {
      //     formData.append("video", file);
      //   });
      // }

      formData.append("name_tm", product.name_tm);
      formData.append("name_ru", product.name_ru);
      formData.append("name_en", product.name_en);
      formData.append("description_tm", product.description_tm);
      formData.append("description_ru", product.description_ru);
      formData.append("description_en", product.description_en);
      formData.append("price", product.price);
      formData.append("is_valyuta", product.is_valyuta);
      product.is_valyuta && formData.append("usd_price", product.price);
      formData.append("is_discount", product.is_discount);
      formData.append("discount", product.discount);
      formData.append("discount_price", product.discount_price);
      product.is_valyuta &&
        formData.append("discount_usd", product.discount_price);
      formData.append("quantity", product.quantity);
      formData.append("massa", product.massa);
      formData.append("on_hand", product.on_hand);
      formData.append("code", product.code);
      formData.append("link", product.link);
      // formData.append("orderNum", product.orderNum);
      formData.append("is_moresale", product.is_moresale);
      formData.append("is_favorite", product.is_favorite);
      formData.append("is_selected", product.is_selected);
      formData.append("is_top", product.is_top);
      formData.append("MarketId", product.MarketId);
      formData.append("CategoryId", product.CategoryId);
      formData.append("SubCategoryId", product.SubCategoryId);
      formData.append("BrandId", product.BrandId);

      axiosInstance
        .post("/api/product/create", formData)
        .then((data) => {
          console.log(data.data);
          message.success("Maglumatlar döredildi!");
          getData();
          setFiles([]);
          setVideoFiles([]);
          setProduct({
            name_tm: "",
            name_en: "",
            name_ru: "",
            description_ru: "",
            description_tm: "",
            description_en: "",
            price: 0,
            usd_price: 0,
            is_discount: false,
            is_valyuta: false,
            discount: 0,
            discount_price: 0,
            discount_usd: 0,
            quantity: 0,
            massa: "",
            on_hand: true,
            is_selected: false,
            is_favorite: false,
            is_top: false,
            code: "",
            is_moresale: false,
            link: "",
            orderNum: null,
            MarketId: 0,
            CategoryId: 0,
            SubCategoryId: 0,
            BrandId: 0,
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

  const onFileChangeVideo = (files) => {
    console.log(files);
    setVideoFiles(files);
  };

  const CreateVideo = () => {
    const formData = new FormData();
    if (videFiles.length > 0) {
      videFiles.map((item) => {
        formData.append("img", item);
      });
    }
    axiosInstance
      .post("/api/product/upl-video/" + product?.id, formData)
      .then((data) => {
        console.log(data);
        setEditVideo(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteVideo = (id) => {
    axiosInstance
      .delete("/api/product/del-video/" + id)
      .then((data) => {
        console.log(data);
        setEditVideo(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateIMG = () => {
    const formData = new FormData();
    if (files.length > 0) {
      files.map((item) => {
        formData.append("img", item);
      });
    }
    axiosInstance
      .post("/api/product/upl-img/" + product?.id, formData)
      .then((data) => {
        console.log(data);
        setEditImg(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteImg = (id) => {
    axiosInstance
      .delete("/api/product/del-img/" + id)
      .then((data) => {
        console.log(data);
        setEditImg(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Drawer
        width={600}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setEditImg(false)}
        visible={editImg}
      >
        <div className="w-full ">
          {product?.ProductImgs?.map((item) => {
            return (
              <div className="w-full my-3">
                <img
                  className="w-full rounded-[12px] object-contain"
                  src={BASE_URL + item?.src}
                />
                <button
                  onClick={() => DeleteImg(item?.id)}
                  className="h-[50px] text-white text-[22px] font-[700] !bg-[#ff3c3c] w-full rounded-[12px]"
                >
                  Delete
                </button>
              </div>
            );
          })}
          <h1>Surat</h1>
          <DropFileInput onFileChange={(files) => onFileChange(files)} />

          <button
            onClick={() => {
              CreateIMG();
            }}
            className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
          >
            {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
          </button>
        </div>
      </Drawer>

      <Drawer
        width={600}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setEditVideo(false)}
        visible={editVideo}
      >
        <div className="w-full ">
          {product?.ProductVideos?.map((video) => {
            return (
              <div className="w-full my-3">
                <video
                  className="w-full rounded-[12px] object-contain"
                  controls
                  src={BASE_URL + video?.src}
                />
                <button
                  onClick={() => DeleteVideo(video?.id)}
                  className="h-[50px] text-white text-[22px] font-[700] !bg-[#ff3c3c] w-full rounded-[12px]"
                >
                  Delete
                </button>
              </div>
            );
          })}
          <h1>Video</h1>
          <DropFileInput onFileChange={(files) => onFileChangeVideo(files)} />

          <button
            onClick={() => {
              CreateVideo();
            }}
            className={`${"!bg-blue !text-white "} bg-[#DEE6F9] h-[50px] rounded-[5px] w-full mt-4 text-[18px] font-sans text-blue`}
          >
            {dil === "tm" ? "Ugrat" : dil === "ru" ? "Отправлять" : "Send"}
          </button>
        </div>
      </Drawer>

      <Drawer
        width={600}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setEdit(false)}
        visible={edit}
      >
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={product.MarketId}
          onChange={(e) => setProduct({ ...product, MarketId: e.target.value })}
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
          value={product.BrandId}
          onChange={(e) => setProduct({ ...product, BrandId: e.target.value })}
        >
          <option disabled value={0}>
            Brands
          </option>
          {brands?.map((item, i) => {
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
          value={product.CategoryId}
          onChange={(e) =>
            setProduct({ ...product, CategoryId: e.target.value })
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
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={product.SubCategoryId}
          onChange={(e) =>
            setProduct({ ...product, SubCategoryId: e.target.value })
          }
        >
          <option disabled value={0}>
            SubCategory
          </option>
          {subCategories?.map((item, i) => {
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
          value={product.name_tm}
          onChange={(e) => setProduct({ ...product, name_tm: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady tm" : dil === "ru" ? "Имя tm" : "Name tm"
          }
        />
        <input
          value={product.name_ru}
          onChange={(e) => setProduct({ ...product, name_ru: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
          }
        />
        <input
          value={product.name_en}
          onChange={(e) => setProduct({ ...product, name_en: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
          }
        />

        <textarea
          value={product.description_tm}
          onChange={(e) =>
            setProduct({ ...product, description_tm: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish tm"
              : dil === "ru"
              ? "Описаниа tm"
              : "Description tm"
          }
        />
        <textarea
          value={product.description_ru}
          onChange={(e) =>
            setProduct({ ...product, description_ru: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish ru"
              : dil === "ru"
              ? "Описаниа ru"
              : "Description ru"
          }
        />
        <textarea
          value={product.description_en}
          onChange={(e) =>
            setProduct({ ...product, description_en: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish en"
              : dil === "ru"
              ? "Описаниа ен"
              : "Description en"
          }
        />

        <input
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={dil === "tm" ? "Kod" : dil === "ru" ? "Код" : "Code"}
        />
        <input
          value={product.link}
          onChange={(e) => setProduct({ ...product, link: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={dil === "tm" ? "Link" : dil === "ru" ? "Link" : "Link"}
        />

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_valyuta"
            name="is_valyuta"
            className="w-[20px] h-[20px]"
            checked={product.is_valyuta}
            onClick={() =>
              setProduct({ ...product, is_valyuta: !product.is_valyuta })
            }
          />
          <label className="cursor-pointer" htmlFor="is_valyuta">
            Haryt USD boyunchamy?
          </label>
        </div>
        <div className="flex justify-between items-center ">
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[85%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Baha" : dil === "ru" ? "Цена" : "Proce"
            }
          />
          <h1 className="flex items-center h-[50px] text-[32px] font-[700]">
            {product.is_valyuta ? "USD" : "TMT"}
          </h1>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_discount"
            name="is_discount"
            className="w-[20px] h-[20px]"
            checked={product.is_discount}
            onClick={() =>
              setProduct({ ...product, is_discount: !product.is_discount })
            }
          />
          <label className="cursor-pointer" htmlFor="is_discount">
            Haryt arzanladyshdamy?
          </label>
        </div>
        {product.is_discount && (
          <div className="flex justify-between items-center ">
            <input
              value={product.discount_price}
              onChange={(e) =>
                setProduct({ ...product, discount_price: e.target.value })
              }
              className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[85%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
              type="text"
              placeholder={
                dil === "tm" ? "Baha" : dil === "ru" ? "Цена" : "Proce"
              }
            />
            <h1 className="flex items-center h-[50px] text-[32px] font-[700]">
              {product.is_valyuta ? "USD" : "TMT"}
            </h1>
          </div>
        )}

        <h1>
          {dil === "tm"
            ? "Stokdaky Sany"
            : dil === "ru"
            ? "Каличиства в Сток"
            : "Stock quantity"}
        </h1>
        <input
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-full border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Stokdaky Sany"
              : dil === "ru"
              ? "Каличиства в Сток"
              : "Stock quantity"
          }
        />
        <input
          value={product.massa}
          onChange={(e) => setProduct({ ...product, massa: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-full border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Agramy" : dil === "ru" ? "Massa" : "Massa"
          }
        />
        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="on_hand"
            name="on_hand"
            className="w-[20px] h-[20px]"
            checked={product.on_hand}
            onClick={() =>
              setProduct({ ...product, is_selected: !product.on_hand })
            }
          />
          <label className="cursor-pointer" htmlFor="on_hand">
            Haryt Elinizdemi?
          </label>
        </div>
        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_selected"
            name="is_selected"
            className="w-[20px] h-[20px]"
            checked={product.is_selected}
            onClick={() =>
              setProduct({ ...product, is_selected: !product.is_selected })
            }
          />
          <label className="cursor-pointer" htmlFor="is_selected">
            Haryt saylananmy?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_favorite"
            name="is_favorite"
            className="w-[20px] h-[20px]"
            checked={product.is_favorite}
            onClick={() =>
              setProduct({ ...product, is_favorite: !product.is_favorite })
            }
          />
          <label className="cursor-pointer" htmlFor="is_favorite">
            Haryt Favoritmi?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_moresale"
            name="is_moresale"
            className="w-[20px] h-[20px]"
            checked={product.is_moresale}
            onClick={() =>
              setProduct({ ...product, is_moresale: !product.is_moresale })
            }
          />
          <label className="cursor-pointer" htmlFor="is_moresale">
            Haryt Kop satylanmy?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_top"
            name="is_top"
            className="w-[20px] h-[20px]"
            checked={product.is_top}
            onClick={() => setProduct({ ...product, is_top: !product.is_top })}
          />
          <label className="cursor-pointer" htmlFor="is_top">
            Haryt Top my?
          </label>
        </div>

        {/* <h1>Surat</h1>
        <DropFileInput onFileChange={(files) => onFileChange(files)} /> */}
        {/* <h1>Videos</h1>
        <DropFileInput onFileChange={(files) => onFileChangeVideo(files)} /> */}

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
        width={600}
        placement="right"
        closable={true}
        mask={true}
        maskClosable={true}
        onClose={() => setGosh(false)}
        visible={gosh}
      >
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={product.MarketId}
          onChange={(e) => setProduct({ ...product, MarketId: e.target.value })}
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
          value={product.BrandId}
          onChange={(e) => setProduct({ ...product, BrandId: e.target.value })}
        >
          <option disabled value={0}>
            Brands
          </option>
          {brands?.map((item, i) => {
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
          value={product.CategoryId}
          onChange={(e) =>
            setProduct({ ...product, CategoryId: e.target.value })
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
        <select
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          value={product.SubCategoryId}
          onChange={(e) =>
            setProduct({ ...product, SubCategoryId: e.target.value })
          }
        >
          <option disabled value={0}>
            SubCategory
          </option>
          {subCategories?.map((item, i) => {
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
          value={product.name_tm}
          onChange={(e) => setProduct({ ...product, name_tm: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady tm" : dil === "ru" ? "Имя tm" : "Name tm"
          }
        />
        <input
          value={product.name_ru}
          onChange={(e) => setProduct({ ...product, name_ru: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady ru" : dil === "ru" ? "Имя ру" : "Name ru"
          }
        />
        <input
          value={product.name_en}
          onChange={(e) => setProduct({ ...product, name_en: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Ady en" : dil === "ru" ? "Имя ен" : "Name en"
          }
        />

        <textarea
          value={product.description_tm}
          onChange={(e) =>
            setProduct({ ...product, description_tm: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish tm"
              : dil === "ru"
              ? "Описаниа tm"
              : "Description tm"
          }
        />
        <textarea
          value={product.description_ru}
          onChange={(e) =>
            setProduct({ ...product, description_ru: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish ru"
              : dil === "ru"
              ? "Описаниа ru"
              : "Description ru"
          }
        />
        <textarea
          value={product.description_en}
          onChange={(e) =>
            setProduct({ ...product, description_en: e.target.value })
          }
          className="min-h-[100px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Dushundirish en"
              : dil === "ru"
              ? "Описаниа ен"
              : "Description en"
          }
        />

        <input
          value={product.code}
          onChange={(e) => setProduct({ ...product, code: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={dil === "tm" ? "Kod" : dil === "ru" ? "Код" : "Code"}
        />
        <input
          value={product.link}
          onChange={(e) => setProduct({ ...product, link: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[100%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={dil === "tm" ? "Link" : dil === "ru" ? "Link" : "Link"}
        />

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_valyuta"
            name="is_valyuta"
            className="w-[20px] h-[20px]"
            checked={product.is_valyuta}
            onClick={() =>
              setProduct({ ...product, is_valyuta: !product.is_valyuta })
            }
          />
          <label className="cursor-pointer" htmlFor="is_valyuta">
            Haryt USD boyunchamy?
          </label>
        </div>
        <div className="flex justify-between items-center ">
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[85%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
            type="text"
            placeholder={
              dil === "tm" ? "Baha" : dil === "ru" ? "Цена" : "Proce"
            }
          />
          <h1 className="flex items-center h-[50px] text-[32px] font-[700]">
            {product.is_valyuta ? "USD" : "TMT"}
          </h1>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_discount"
            name="is_discount"
            className="w-[20px] h-[20px]"
            checked={product.is_discount}
            onClick={() =>
              setProduct({ ...product, is_discount: !product.is_discount })
            }
          />
          <label className="cursor-pointer" htmlFor="is_discount">
            Haryt arzanladyshdamy?
          </label>
        </div>
        {product.is_discount && (
          <div className="flex justify-between items-center ">
            <input
              value={product.discount_price}
              onChange={(e) =>
                setProduct({ ...product, discount_price: e.target.value })
              }
              className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-[85%] border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
              type="text"
              placeholder={
                dil === "tm" ? "Baha" : dil === "ru" ? "Цена" : "Proce"
              }
            />
            <h1 className="flex items-center h-[50px] text-[32px] font-[700]">
              {product.is_valyuta ? "USD" : "TMT"}
            </h1>
          </div>
        )}

        <h1>
          {dil === "tm"
            ? "Stokdaky Sany"
            : dil === "ru"
            ? "Каличиства в Сток"
            : "Stock quantity"}
        </h1>
        <input
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-full border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm"
              ? "Stokdaky Sany"
              : dil === "ru"
              ? "Каличиства в Сток"
              : "Stock quantity"
          }
        />

        <input
          value={product.massa}
          onChange={(e) => setProduct({ ...product, massa: e.target.value })}
          className="h-[50px] rounded-[6px] bg-[#FFFFFF] w-full border-[1px] border-[#E3E7EE] text-[#999999] pl-[12px] text-[16px] font-sans mb-4"
          type="text"
          placeholder={
            dil === "tm" ? "Agramy" : dil === "ru" ? "Massa" : "Massa"
          }
        />

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="on_hand"
            name="on_hand"
            className="w-[20px] h-[20px]"
            checked={product.on_hand}
            onClick={() =>
              setProduct({ ...product, is_selected: !product.on_hand })
            }
          />
          <label className="cursor-pointer" htmlFor="on_hand">
            Haryt Elinizdemi?
          </label>
        </div>
        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_selected"
            name="is_selected"
            className="w-[20px] h-[20px]"
            checked={product.is_selected}
            onClick={() =>
              setProduct({ ...product, is_selected: !product.is_selected })
            }
          />
          <label className="cursor-pointer" htmlFor="is_selected">
            Haryt saylananmy?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_favorite"
            name="is_favorite"
            className="w-[20px] h-[20px]"
            checked={product.is_favorite}
            onClick={() =>
              setProduct({ ...product, is_favorite: !product.is_favorite })
            }
          />
          <label className="cursor-pointer" htmlFor="is_favorite">
            Haryt Favoritmi?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_moresale"
            name="is_moresale"
            className="w-[20px] h-[20px]"
            checked={product.is_moresale}
            onClick={() =>
              setProduct({ ...product, is_moresale: !product.is_moresale })
            }
          />
          <label className="cursor-pointer" htmlFor="is_moresale">
            Haryt Kop satylanmy?
          </label>
        </div>

        <div className="flex gap-3 mb-4 justify-start items-start w-full cursor-pointer select-none">
          <input
            type="checkbox"
            id="is_top"
            name="is_top"
            className="w-[20px] h-[20px]"
            checked={product.is_top}
            onClick={() => setProduct({ ...product, is_top: !product.is_top })}
          />
          <label className="cursor-pointer" htmlFor="is_top">
            Haryt Top my?
          </label>
        </div>

        <h1>Surat</h1>
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
        {/* <h1>Videos</h1>
        <DropFileInput onFileChange={(files) => onFileChangeVideo(files)} /> */}

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
          {dil === "tm" ? "Haryt" : dil === "ru" ? "Продукты" : "Products"}
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
          {dil === "tm" ? " Goşmak" : dil === "ru" ? "Добавить " : "Add "}
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

export default Product;
