"use client";
import { useGlobalRemoveFromWishlist } from "@/app/api/globals";
import Link from "next/link";
import Image from "next/image";
import { currencyFormat } from "@/helpers/functions";
import React, { useState, useCallback, useEffect } from "react";
import Heart from "../../assets/Icons/heart.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import { toast, ToastContainer } from "react-toastify";
import { useCartContext } from "@/app/api/cartContext";
import { useGlobalAddToCart } from "@/app/api/globals";
import { get, list, deleteMethod as DELETE } from "@/app/api/api";
import CartProductBox from "../CartProductBox";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const WishlistItems = ({ items, product, border }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();
  const globalAddToCart = useGlobalAddToCart();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cart, , wishList] = useCartContext();
  const [stickerHovered, setStickerHovered] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const addToCart = useGlobalAddToCart();

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState({
    status: false,
    id: null,
  });
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);

  useEffect(() => {
    const getCart = async () => {
      const cartResponse = await list("/cart").then((response) =>
        setCartData(response?.payload?.items)
      );
    };
    getCart();
  }, [cart]);
  const isStickerHovered = stickerHovered === product?.id;
  const [, , , mutateWishList] = useCartContext();
  const [idProduct, setIdProduct] = useState(null);

  const removeFromWishlist = async (id, name) => {
    return DELETE(`/wishlist/${id}`).then((response) => {
      if (response?.code === 200) {
        toast.success(`Proizvod ${name} je uspešno uklonjen iz liste želja!`, {
          position: "top-center",
          autoClose: 2000,
        });
        mutateWishList();
      } else {
        toast.error("Došlo je do greške!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };
  const variantOptionSize = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "velicina";
  });
  const variantOptionColor = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "boja";
  });
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
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
  });
  const [image, setImage] = useState({
    image: null,
    id: null,
  });
  return (
    <>
      <div
        className="col-span-1 relative item mt-[2rem] lg:mt-[5rem] hoveredColor"
        onMouseEnter={() => {
          setNavigationEnabled({
            enabled: true,
            id: product?.basic_data?.id_product,
          });
        }}
        onMouseLeave={() =>
          setNavigationEnabled({
            enabled: false,
            id: null,
          })
        }
      >
        <div className="max-md:h-[250px] md:h-[450px] lg:h-[500px] 2xl:h-[575px] item relative">
          <Swiper
            modules={[Navigation, Pagination]}
            // onSwiper={(swiper) => setSwiper(swiper)}
            pagination={true}
            direction={"horizontal"}
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
                  <Link href={`/${product?.slug}`} className="z-50">
                    <Image
                      src={convertHttpToHttps(
                        image?.id === product?.basic_data?.id_product
                          ? image?.image
                          : item
                      )}
                      alt={product?.basic_data?.name}
                      sizes={
                        "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                      }
                      width={0}
                      height={0}
                      priority={true}
                      className={`transition-all duration-200 opacity-100 object-fill w-full h-full`}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/*<div className="absolute bottom-2 left-4">*/}
          {/*  <span className="text-[0.75rem] text-black bg-white px-3.5 font-bold py-1 rounded-md">*/}
          {/*    -35%*/}
          {/*  </span>*/}
          {/*</div>*/}
          {product?.price?.discount?.active && (
            <div
              className={`absolute right-2 top-2 z-[1] text-white text-[13px]`}
            >
              <div
                className={`bg-[#c23d27] px-[0.85rem] py-1 rounded-lg font-bold`}
              >
                -
                {(
                  ((product?.price?.price?.original -
                    product?.price?.price?.discount) /
                    product?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </div>
            </div>
          )}
          {product?.variant_options?.length > 0 ? (
            <div className="absolute z-[100] py-2 left-0 bottom-0 w-full mx-auto bg-white chevrons opacity-90">
              <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                {/* <h1 className="text-[0.938rem] font-semibold text-center">
                    Izaberi zapreminu
                  </h1> */}
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

        <div className="mt-[0.813rem] flex items-center justify-between relative z-[50]">
          <h1 className="text-[0.813rem] clamp">{product?.basic_data?.name}</h1>
          <div
            onClick={() => {
              removeFromWishlist(items, product?.basic_data?.name);
            }}
            className=" p-1 favorites"
          >
            <i className="fa-solid fa-times text-lg cursor-pointer hover:text-red-500" />
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
          <div className={` w-full`}>
            <div
              className={`flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem] mt-2 color`}
            >
              {loading?.status &&
              loading?.id === product?.basic_data?.id_product ? (
                <i
                  className={`fa fa-solid fa-spinner animate-spin text-xl`}
                ></i>
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
                        } rounded-full  cursor-pointer flex items-center justify-center text-center text-xs w-[9px] md:w-[15px] h-[9px] md:h-[15px] border hover:border-[#242424] transition-all relative duration-500`}
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
            {variantOptionColor?.values?.length > 1 && (
              <div className={`text-[0.75rem] text-left mt-1 hoveredColor1`}>
                + {variantOptionColor?.values?.length - 1}{" "}
                {variantOptionColor?.values?.length - 1 === 1
                  ? "boja"
                  : variantOptionColor?.values?.length - 1 >= 2 &&
                    variantOptionColor?.values?.length - 1 <= 4
                  ? "boje"
                  : "boja"}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default WishlistItems;
