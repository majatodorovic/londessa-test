"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import { get } from "@/app/api/api";
import ProductPrice from "./ProductPrice";
import { currencyFormat } from "@/helpers/function";

const Thumb = ({ data, slider }) => {
  const [swiper, setSwiper] = useState(null);
  const [loading, setLoading] = useState({
    id: null,
    status: false,
  });
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const [productVariant, setProductVariant] = useState(null);
  const [selected, setSelected] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
  });
  // useEffect(() => {
  //   const setVariantColorOption = (data) => {
  //     const selectedOptions = new Set();
  //
  //     data?.forEach((item) => {
  //       item?.variant_options?.forEach((item2) => {
  //         if (item2?.attribute?.slug === "color") {
  //           selectedOptions.clear(); // Clear existing selections
  //           selectedOptions.add(
  //             JSON.stringify({
  //               attribute_key: item2?.attribute?.key,
  //               value_key: item2?.values[0]?.key,
  //             })
  //           );
  //         }
  //       });
  //     });
  //
  //     setSelected(Array.from(selectedOptions, (option) => JSON.parse(option)));
  //   };
  //
  //   setVariantColorOption(data);
  // }, []);

  useEffect(() => {
    if (selected?.length === 2) {
      setLoading({
        id: idProduct,
        status: true,
      });
      const getVariant = async (selected) => {
        const res = await get(`/product-details/basic-data/${idProduct}`);
        if (
          res?.payload?.data?.variant_items &&
          res?.code === 200 &&
          selected?.length === 2
        ) {
          const variantItems = res?.payload?.data?.variant_items;
          const variant = variantItems?.find((item) =>
            item?.variant_key_array?.every((variantKey) =>
              selected?.some(
                (selection) =>
                  selection?.attribute_key === variantKey?.attribute_key &&
                  selection?.value_key === variantKey?.value_key
              )
            )
          );
          !variant?.basic_data?.name
            ? toast.error(`Došlo je do greške, molimo Vas pokušajte ponovo.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            : toast.success(
                `Proizvod ${variant?.basic_data?.name} je dodat u korpu`,
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                }
              );
          addToCart(variant?.basic_data?.id_product, 1);
          setSelected([]);
          setIdProduct(null);
          setLoading({
            id: null,
            status: false,
          });
          return variant;
        }
      };
      getVariant(selected);
    }
  }, [selected, idProduct]);

  const products = (data ?? []).map((product, index) => {
    const variantOptionSize = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "size";
    });
    const variantOptionColor = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "color";
    });

    return (
      <SwiperSlide key={product?.basic_data?.id} className="">
        <div
          className="w-full item"
          onMouseEnter={() =>
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            })
          }
          onMouseLeave={() =>
            setNavigationEnabled({
              enabled: false,
              id: null,
            })
          }
        >
          {" "}
          <div className="max-md:h-[250px] md:h-[450px] lg:h-[500px] 2xl:h-[575px] item relative">
            <Swiper
              modules={[Navigation, Pagination]}
              // onSwiper={(swiper) => setSwiper(swiper)}
              pagination={true}
              direction={"vertical"}
              loop={true}
              navigation={
                navigationEnabled.enabled === true &&
                navigationEnabled.id === product?.basic_data?.id_product
              }
              breakpoints={{
                320: {
                  navigation: {
                    enabled: false,
                  },
                },
                1024: {
                  navigation: {
                    enabled: true,
                  },
                  pagination: {
                    enabled: false,
                  },
                  direction: "horizontal",
                },
              }}
              className={`categoryImageSwiper relative`}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {product?.image?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/${product?.link?.link_path}`}
                    scroll={true}
                    className="z-[100]"
                  >
                    <Image
                      src={convertHttpToHttps(image)}
                      alt={product?.basic_data?.name}
                      fill
                      sizes={
                        "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      }
                      priority
                      className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {product?.variant_options?.length > 0 ? (
              <div className="absolute z-[100] rounded-lg py-5 left-3 bottom-[10px] w-[95%] mx-auto bg-white chevrons">
                <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                  <h1 className="text-[0.938rem] font-semibold text-center">
                    Izaberi zapreminu
                  </h1>
                  <div className="flex flex-row items-center justify-center gap-3  mt-2 w-full">
                    <Swiper
                      slidesPerView={3}
                      breakpoints={{
                        640: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1300: {
                          slidesPerView: 4,
                        },
                        1680: {
                          slidesPerView: 5,
                        },
                      }}
                      className="variantsSwiper"
                      loop={true}
                      rewind={true}
                      dir={"ltr"}
                      modules={[Navigation]}
                      navigation={
                        variantOptionSize?.values?.length >
                        swiper?.params?.slidesPerView
                      }
                      style={{ width: "100%", display: "block" }}
                      onSwiper={(swiper) => {
                        setSwiper(swiper);
                      }}
                    >
                      {variantOptionSize?.values?.map((item3) => {
                        const variantAttributeKey =
                          variantOptionSize?.attribute?.key;
                        const isSelected = selected?.find(
                          (selection) =>
                            selection?.attribute_key === variantAttributeKey &&
                            selection?.value_key === item3?.key
                        );
                        return (
                          <SwiperSlide key={Math.random()}>
                            <div
                              className={`max-sm:scale-[0.8] rounded-full mx-auto cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border ${
                                isSelected &&
                                variantAttributeKey === variantAttributeKey
                                  ? `border-[#242424] bg-[#242424] text-white`
                                  : ``
                              }`}
                              onClick={() => {
                                if (product?.variant_options?.length > 1) {
                                  setSelected((prevSelected) => {
                                    const filteredSelections =
                                      prevSelected?.filter(
                                        (selection) =>
                                          selection?.attribute_key !==
                                          variantAttributeKey
                                      );

                                    return [
                                      ...filteredSelections,
                                      {
                                        attribute_key: variantAttributeKey,
                                        value_key: item3?.key,
                                      },
                                    ];
                                  });
                                  setIdProduct(product?.basic_data?.id_product);
                                } else {
                                  const productVariantGet = async () => {
                                    const res = await get(
                                      `/product-details/basic-data/${product?.basic_data?.id_product}`
                                    );
                                    const data = res?.payload?.data;
                                    if (data?.variant_items) {
                                      const clickedVariant =
                                        data?.variant_items?.find(
                                          (variantItem) => {
                                            return variantItem?.variant_key_array?.some(
                                              (variantKey) => {
                                                return (
                                                  variantKey?.value_key ===
                                                  item3.key
                                                );
                                              }
                                            );
                                          }
                                        );
                                      setProductVariant(
                                        clickedVariant?.basic_data?.id_product
                                      );
                                      addToCart(
                                        clickedVariant?.basic_data?.id_product,
                                        1,
                                        false
                                      );
                                      toast.success(
                                        `Proizvod ${clickedVariant.basic_data.name} je dodat u korpu!`,
                                        {
                                          position: "top-center",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                    }
                                  };
                                  productVariantGet();
                                }
                              }}
                            >
                              {item3?.name}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    <p onClick={() => onSwiperRightClick()}>&nbsp;</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="mt-[0.813rem] max-md:text-left  flex max-md:items-start items-center justify-between relative z-[50]">
            <Link
              href={`/${product?.link?.link_path}`}
              scroll={true}
              className="relative z-[5]"
            >
              <h1 className="text-[0.813rem] max-md:text-[0.75rem] clamp max-md:leading-4">
                {product?.basic_data?.name}
              </h1>
            </Link>
            <div
              onClick={() => {
                addToWishlist(product?.basic_data?.id_product);
                toast.success(
                  `Proizvod ${product?.basic_data?.name} je dodat u listu želja!`,
                  {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }}
              className="hover:bg-red-500 max-md:hidden rounded-full p-1 favorites cursor-pointer"
            >
              <Image
                src={"/heart.png"}
                alt="wishlist"
                width={15}
                height={15}
                className="favorite"
              />
            </div>
          </div>
          <div className=" flex items-center gap-1 flex-wrap max-md:text-[0.75rem] text-[0.813rem]  min-w-[5.938rem] max-w-max">
            <div className={`bg-[#f8ce5d] px-2 font-bold text-center`}>
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
            </div>
            {product?.price?.discount?.active && (
              <span className={`line-through`}>
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>
          <div className={`flex flex-row items-start gap-3 mt-2 max-lg:hidden`}>
            {loading?.status &&
            loading?.id === product?.basic_data?.id_product ? (
              <i className={`fa fa-solid fa-spinner animate-spin text-xl`}></i>
            ) : (
              <>
                {variantOptionColor?.values?.map((item3) => {
                  const variantAttributeKey =
                    variantOptionColor?.attribute?.key;
                  const isSelected = selected.find(
                    (item) =>
                      item?.attribute_key === variantAttributeKey &&
                      item?.value_key === item3?.key
                  );

                  return (
                    <div
                      key={item3?.key}
                      className={`max-sm:scale-[0.8] ${
                        isSelected ? `border border-[#242424] p-[0.5px]` : ``
                      } rounded-full  cursor-pointer flex items-center justify-center text-center text-xs w-[15px] h-[15px] border hover:border-[#242424] transition-all relative duration-500`}
                      onClick={() => {
                        setSelected((prevSelected) => {
                          // Remove previous selections with the same variantAttributeKey
                          const filteredSelections = prevSelected.filter(
                            (selection) =>
                              selection.attribute_key !== variantAttributeKey
                          );
                          return [
                            ...filteredSelections,
                            {
                              attribute_key: variantAttributeKey,
                              value_key: item3?.key,
                            },
                          ];
                        });
                        setIdProduct(product?.basic_data?.id_product);
                      }}
                    >
                      {item3?.image && (
                        <Image
                          src={item3?.image}
                          alt=""
                          className="rounded-full"
                          fill
                          sizes={
                            "(max-width: 639px) 15px, (max-width: 767px) 15px, (max-width: 1023px) 15px, (max-width: 1279px) 15px, 15px"
                          }
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });
  const addToWishlist = useGlobalAddToWishList();
  const addToCart = useGlobalAddToCart();
  if (slider) {
    return (
      <>
        <ToastContainer />
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="mySwiper3 w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  } else {
    const [productVariant, setProductVariant] = useState(null);
    const addToWishlist = useGlobalAddToWishList();
    const addToCart = useGlobalAddToCart();
    const [initialSlide, setInitialSlide] = useState(0);
    const [image, setImage] = useState({
      image: null,
      id: null,
    });

    useEffect(() => {
      if (image) {
        const imagesArray = data?.map((item) => {
          return item?.image;
        });
      }
    }, [image]);

    const products = data?.map((product, index) => {
      const variantOptionSize = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "size";
      });
      const variantOptionColor = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "color";
      });
      return (
        <div
          className="col-span-1 relative item"
          onMouseEnter={() => {
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            });
          }}
        >
          <div className="max-md:h-[250px] md:h-[450px] lg:h-[500px] 2xl:h-[575px] item relative">
            <Swiper
              modules={[Navigation, Pagination]}
              // onSwiper={(swiper) => setSwiper(swiper)}
              pagination={true}
              direction={"vertical"}
              loop={true}
              initialSlide={product?.image?.findIndex(
                (item) => item === product?.image[0]
              )}
              navigation={
                navigationEnabled.enabled === true &&
                navigationEnabled.id === product?.basic_data?.id_product
              }
              breakpoints={{
                320: {
                  navigation: {
                    enabled: false,
                  },
                },
                1024: {
                  navigation: {
                    enabled: true,
                  },
                  pagination: {
                    enabled: false,
                  },
                  direction: "horizontal",
                },
              }}
              className={`categoryImageSwiper relative`}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {product?.image?.map((item, index) => {
                return (
                  <SwiperSlide>
                    <Link
                      href={`/${product?.link?.link_path}`}
                      className="z-50"
                    >
                      <Image
                        src={convertHttpToHttps(
                          image?.id === product?.basic_data?.id_product
                            ? image?.image
                            : item
                        )}
                        alt={product?.basic_data?.name}
                        fill
                        sizes={
                          "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                        }
                        style={{ objectFit: "cover" }}
                        priority={true}
                        className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {product?.variant_options?.length > 0 ? (
              <div className="absolute z-50 rounded-lg py-5 left-3 bottom-[10px] w-[95%] mx-auto bg-white chevrons">
                <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                  <h1 className="text-[0.938rem] font-semibold text-center">
                    Izaberi zapreminu
                  </h1>
                  <div className="flex flex-row items-center justify-center gap-3  mt-2 w-full">
                    <Swiper
                      slidesPerView={3}
                      breakpoints={{
                        640: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1300: {
                          slidesPerView: 4,
                        },
                        1680: {
                          slidesPerView: 5,
                        },
                      }}
                      className="variantsSwiper"
                      loop={true}
                      rewind={true}
                      dir={"ltr"}
                      modules={[Navigation]}
                      navigation={
                        variantOptionSize?.values?.length >
                        swiper?.params?.slidesPerView
                      }
                      style={{ width: "100%", display: "block" }}
                      onSwiper={(swiper) => {
                        setSwiper(swiper);
                      }}
                    >
                      {variantOptionSize?.values?.map((item3) => {
                        const variantAttributeKey =
                          variantOptionSize?.attribute?.key;
                        const isSelected = selected?.find(
                          (selection) =>
                            selection?.attribute_key === variantAttributeKey &&
                            selection?.value_key === item3?.key
                        );
                        return (
                          <SwiperSlide key={Math.random()}>
                            <div
                              className={`max-sm:scale-[0.8] rounded-full mx-auto cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border ${
                                isSelected &&
                                variantAttributeKey === variantAttributeKey
                                  ? `border-[#242424] bg-[#242424] text-white`
                                  : ``
                              }`}
                              onClick={() => {
                                if (product?.variant_options?.length > 1) {
                                  setSelected((prevSelected) => {
                                    const filteredSelections =
                                      prevSelected?.filter(
                                        (selection) =>
                                          selection?.attribute_key !==
                                          variantAttributeKey
                                      );

                                    return [
                                      ...filteredSelections,
                                      {
                                        attribute_key: variantAttributeKey,
                                        value_key: item3?.key,
                                      },
                                    ];
                                  });
                                  setIdProduct(product?.basic_data?.id_product);
                                } else {
                                  const productVariantGet = async () => {
                                    const res = await get(
                                      `/product-details/basic-data/${product?.basic_data?.id_product}`
                                    );
                                    const data = res?.payload?.data;
                                    if (data?.variant_items) {
                                      const clickedVariant =
                                        data?.variant_items?.find(
                                          (variantItem) => {
                                            return variantItem?.variant_key_array?.some(
                                              (variantKey) => {
                                                return (
                                                  variantKey?.value_key ===
                                                  item3.key
                                                );
                                              }
                                            );
                                          }
                                        );
                                      setProductVariant(
                                        clickedVariant?.basic_data?.id_product
                                      );
                                      addToCart(
                                        clickedVariant?.basic_data?.id_product,
                                        1,
                                        false
                                      );
                                      toast.success(
                                        `Proizvod ${clickedVariant.basic_data.name} je dodat u korpu!`,
                                        {
                                          position: "top-center",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                    }
                                  };
                                  productVariantGet();
                                }
                              }}
                            >
                              {item3?.name}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    <p onClick={() => onSwiperRightClick()}>&nbsp;</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/*<div className="absolute bottom-2 left-4">*/}
          {/*  <span className="text-[0.75rem] max-md:text-[0.65rem] text-black bg-white px-3.5 font-bold py-1 rounded-md">*/}
          {/*    -35%*/}
          {/*  </span>*/}
          {/*</div>*/}
          {/* <div className="absolute  px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
            <div>
              <Image
                className="cursor-pointer rotate-180"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === 0) {
                    setImageIndex(product?.image.length - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              />
            </div>
            <div>
              <Image
                className="cursor-pointer rotate-0"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === product?.image.length - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              />
            </div>
          </div> */}
          <div className="mt-[0.813rem] flex items-center justify-between relative z-[50]">
            <Link
              href={`/${product?.link?.link_path}`}
              className="text-[0.813rem] relative max-md:leading-4 clamp"
            >
              {product?.basic_data?.name}
            </Link>
            <div
              onClick={() => {
                addToWishlist(product?.basic_data?.id_product);
                toast.success(
                  `Proizvod ${product?.basic_data?.name} je dodat u listu želja!`,
                  {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }}
              className="hover:bg-red-500 max-md:hidden rounded-full p-1 favorites cursor-pointer"
            >
              <Image
                src={"/heart.png"}
                alt="wishlist"
                width={15}
                height={15}
                className="favorite"
              />
            </div>
          </div>
          <div className=" flex items-center gap-1 mt-2 flex-wrap max-md:text-[0.75rem] text-[0.813rem]  min-w-[5.938rem] max-w-max">
            <div className={`bg-[#f8ce5d] px-2  font-bold text-center`}>
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
            </div>
            {product?.price?.discount?.active && (
              <span className={`line-through `}>
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>{" "}
          <div className={`flex flex-row items-start gap-3 max-sm:gap-0 mt-2`}>
            {loading?.status &&
            loading?.id === product?.basic_data?.id_product ? (
              <i className={`fa fa-solid fa-spinner animate-spin text-xl`}></i>
            ) : (
              <>
                {variantOptionColor?.values?.map((item3) => {
                  const variantAttributeKey =
                    variantOptionColor?.attribute?.key;
                  const isSelected = selected.find(
                    (item) =>
                      item?.attribute_key === variantAttributeKey &&
                      item?.value_key === item3?.key
                  );

                  return (
                    <div
                      key={item3?.key}
                      className={`max-sm:scale-[0.8] ${
                        isSelected ? `border border-[#242424] p-[0.5px]` : ``
                      } rounded-full  cursor-pointer flex flex-wrap items-center justify-center max-md:hidden text-center text-xs w-[10px] h-[10px] md:w-[15px] md:h-[15px] border hover:border-[#242424] transition-all relative duration-500`}
                      onClick={() => {
                        setSelected((prevSelected) => {
                          // Remove previous selections with the same variantAttributeKey
                          const filteredSelections = prevSelected.filter(
                            (selection) =>
                              selection.attribute_key !== variantAttributeKey
                          );
                          return [
                            ...filteredSelections,
                            {
                              attribute_key: variantAttributeKey,
                              value_key: item3?.key,
                            },
                          ];
                        });
                        setIdProduct(product?.basic_data?.id_product);
                        setImage({
                          id: product?.basic_data?.id_product,
                          image: item3?.product_image,
                        });
                      }}
                    >
                      {item3?.image && (
                        <Image
                          src={item3?.image}
                          alt=""
                          priority={true}
                          className="rounded-full"
                          fill
                          sizes={"15px"}
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                  );
                })}

                {variantOptionColor?.values?.map((item3) => {
                  const variantAttributeKey =
                    variantOptionColor?.attribute?.key;
                  const isSelected = selected.find(
                    (item) =>
                      item?.attribute_key === variantAttributeKey &&
                      item?.value_key === item3?.key
                  );

                  return (
                    <div
                      key={item3?.key}
                      className={`max-sm:scale-[0.8] border rounded-full md:hidden cursor-pointer flex items-center justify-center text-center text-xs w-[10px] h-[10px] md:w-[15px] md:h-[15px] transition-all relative duration-500`}
                    >
                      {item3?.image && (
                        <Image
                          src={item3?.image}
                          alt=""
                          className="rounded-full"
                          fill
                          sizes={"15px"}
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      );
    });
    return (
      <>
        {products}
        <ToastContainer />
      </>
    );
  }
};

export default Thumb;
