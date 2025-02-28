"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Wishlist from "../../assets/Icons/heart.png";
import WishlistActive from "../../assets/Icons/heart-active.png";
import { currencyFormat } from "@/helpers/functions";
import { get } from "@/app/api/api";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/hooks/ecommerce.hooks";
import { Prices } from "@/_components/prices";

export const Thumb = ({
  slug,
  slider,
  productsPerViewMobile,
  refreshWishlist = () => {},
  categoryId,
}) => {
  const { data: product } = useProductThumb({
    slug: slug,
    id: slug,
    categoryId: categoryId,
  });
  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();

  const { data: wishlist_data, refetch } = useIsInWishlist({ id: slug });

  useEffect(() => {
    refetch();
    refreshWishlist();
  }, [isAdded, isRemoved]);

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

  useEffect(() => {
    if (selected?.length === 2 && product?.variant_options?.length === 2) {
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

          addToCart({ id: variant?.basic_data?.id_product, quantity: 1 });
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
    if (selected?.length === 1 && product?.variant_options?.length === 1) {
      setLoading({
        id: idProduct,
        status: true,
      });
      const getVariant = async (selected) => {
        const res = await get(`/product-details/basic-data/${idProduct}`);
        if (
          res?.payload?.data?.variant_items &&
          res?.code === 200 &&
          selected?.length === 1
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
          addToCart({ id: variant?.basic_data?.id_product, quantity: 1 });
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

  const [initialSlide, setInitialSlide] = useState(0);
  const [image, setImage] = useState({
    image: null,
    id: null,
  });

  // useEffect(() => {
  //   if (image) {
  //     const imagesArray = data?.map((item) => {
  //       return item?.image;
  //     });
  //   }
  // }, [image]);

  const variantOptionSize = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "velicina";
  });
  const variantOptionColor = product?.variant_options?.find((variant) => {
    return variant?.attribute?.slug === "boja";
  });

  const isInWishlist = {
    exist: wishlist_data?.exist,
    wishlist_item_id: wishlist_data?.wishlist_item_id,
  };

  return (
    <div
      key={slug}
      className="col-span-1 aspect-2/3 relative item hoveredColor border p-3 rounded-lg hover:shadow-lg transition-all duration-500"
    >
      <div className={`aspect-2/3 w-full item relative`}>
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          pagination={true}
          direction={"horizontal"}
          rewind
          breakpoints={{
            1024: {
              pagination: {
                enabled: false,
              },
              direction: "horizontal",
            },
          }}
          className={`categoryImageSwiper relative`}
        >
          {product?.image?.map((item, index) => {
            return (
              <SwiperSlide>
                <Link href={`/${product?.link?.link_path}`} className="z-50">
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
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {product?.price?.discount?.active && (
          <div className={`absolute left-2 top-2 z-[1] text-white text-[13px]`}>
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
        {product?.stickers?.length > 0 && (
          <div
            className={`absolute right-2 top-2 z-[1] text-center text-white text-[13px] flex flex-col gap-2`}
          >
            {product?.stickers?.map((sticker) => {
              return (
                <div
                  className={`text-[13px] bg-[#CA965C] px-[0.85rem] py-1 rounded-lg font-bold`}
                >
                  {sticker?.name}
                </div>
              );
            })}
          </div>
        )}
        {variantOptionSize?.values?.length > 0 ? (
          <div className="absolute z-[100] py-2 left-0 bottom-0 w-full mx-auto bg-white chevrons opacity-90">
            <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
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
                      <SwiperSlide key={item3?.name}>
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
                                const filteredSelections = prevSelected?.filter(
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
                                    data?.variant_items?.find((variantItem) => {
                                      return variantItem?.variant_key_array?.some(
                                        (variantKey) => {
                                          return (
                                            variantKey?.value_key === item3.key
                                          );
                                        }
                                      );
                                    });
                                  setProductVariant(
                                    clickedVariant?.basic_data?.id_product
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
        <Link
          href={`/${product?.link?.link_path}`}
          className="max-md:text-[0.85] text-[0.813rem] relative max-md:leading-4 max-sm:line-clamp-1"
        >
          {product?.basic_data?.name}
        </Link>

        <div
          onClick={() => {
            if (!isInWishlist?.exist) {
              addToWishlist({ id: slug, name: product?.basic_data?.name });
            } else {
              removeFromWishlist({ id: isInWishlist?.wishlist_item_id });
            }
          }}
          className={`max-md:hidden rounded-full p-1 group cursor-pointer ${
            isInWishlist?.exist ? "" : "hover:bg-red-500"
          }`}
        >
          {isInWishlist?.exist && <p> </p>}
          {!isInWishlist?.exist ? (
            <Image
              src={Wishlist}
              alt="wishlist"
              width={15}
              height={15}
              className={`${
                isInWishlist?.exist && "!hidden "
              } group-hover:invert block w-full h-full`}
            />
          ) : (
            <Image
              src={WishlistActive}
              alt="wishlist"
              width={15}
              height={15}
              className={`${
                isInWishlist?.exist && "!block"
              } hidden group-hover:block w-full h-full`}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2 flex-wrap max-md:text-[0.75rem] text-[0.813rem] min-w-[5.938rem] max-w-max">
        <div
          className={`${
            product?.price?.discount?.active && "bg-[#f8ce5d] px-2"
          } md:mt-3 font-bold text-center`}
        >
          <Prices
            price={product?.price}
            inventory={product?.inventory}
            type={"default"}
          />
        </div>
        {product?.price?.discount?.active && (
          <span className={`line-through md:mt-3`}>
            {currencyFormat(product?.price?.price?.original)}
          </span>
        )}
      </div>{" "}
      <div className={`absolute bottom-[-20px] w-full`}>
        <div
          className={`flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem] mt-2 color`}
        >
          {loading?.status &&
          loading?.id === product?.basic_data?.id_product ? (
            <i className={`fa fa-solid fa-spinner animate-spin text-xl`}></i>
          ) : (
            <>
              {variantOptionColor?.values?.map((item3) => {
                const variantAttributeKey = variantOptionColor?.attribute?.key;
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
  );
};
