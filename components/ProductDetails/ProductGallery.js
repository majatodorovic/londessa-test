"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/zoom";

import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import Image from "next/image";
import classes from "./styles.module.css";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";
import { useSearchParams } from "next/navigation";

export const ProductGallery = ({ slug, id }) => {
  const [loading, setLoading] = useState(false);
  const { data: productGallery } = useSuspenseQuery({
    queryKey: ["productGallery", id],
    queryFn: async () => {
      return await get(`/product-details/gallery/${id}`).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });

  const [gallery, setGallery] = useState(productGallery?.gallery);

  const params = useSearchParams();
  const size = params?.get("size");

  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
    onClick = () => {},
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="h-full w-full object-cover aspect-2/3"
        onClick={onClick}
      >
        <Image
          src={src}
          width={0}
          height={0}
          ref={mainSliderRef}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          priority={true}
          className="!h-full !object-cover w-full"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={`Croonus Shop`}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundsize: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const productImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className="w-full relative">
        <ImageMagnifier
          src={convertHttpToHttps(image?.image)}
          width={0}
          height={0}
          onClick={() => {
            setModalImage(image?.image);
          }}
        />
      </SwiperSlide>
    );
  });

  const thumbImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className={`!overflow-hidden !aspect-2/3`}>
        <Image
          src={convertHttpToHttps(image?.image)}
          alt={`croonus Shop`}
          width={0}
          height={0}
          priority={true}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          className="cursor-pointer max-md:hidden w-full !h-full !object-cover"
        />
      </SwiperSlide>
    );
  });

  const [newImage, setNewImage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (size) {
      setLoading(true);
      const newImages = productGallery?.gallery?.filter((item) =>
        item?.variant_key?.includes(size)
      );

      const nonVariantImages = productGallery.gallery?.filter(
        (item) => item?.variant_key_array?.length === 0
      );

      setGallery([...newImages, ...nonVariantImages]);
    }
    if (productGallery?.gallery?.length) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [size]);

  const [mainSliderHeight, setMainSliderHeight] = useState();

  const mainSliderRef = useRef(null);

  useEffect(() => {
    const updateMainSliderHeight = () => {
      if (mainSliderRef.current) {
        const thumbsSwiper = document.getElementById("thumbsSwiper");
        thumbsSwiper.style.height = `${mainSliderRef.current.clientHeight}px`;
      }
    };

    updateMainSliderHeight();

    window.addEventListener("resize", updateMainSliderHeight);
    return () => {
      window.removeEventListener("resize", updateMainSliderHeight);
    };
  }, []);

  return (
    <div className="col-span-2 max-lg:col-span-4 max-md:aspect-2/3 md:flex md:flex-row-reverse gap-5 h-fit overflow-hidden">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination, Navigation]}
        initialSlide={size ? newImage : 0}
        navigation={true}
        loop={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`${classes.mySwiper2} mySwiper2 !relative`}
        breakpoints={{
          768: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              enabled: false,
            },
            navigation: {
              enabled: true,
            },
            modules: [FreeMode, Thumbs, Navigation],
          },
          0: {
            direction: "vertical",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
            navigation: {
              el: ".swiper-nav-button",
              clickable: true,
              enabled: false,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
            modules: [FreeMode, Thumbs, Pagination],
          },
        }}
      >
        {loading ? (
          <SwiperSlide>
            <div className="h-full aspect-2/3 w-full bg-gray-200 animate-pulse"></div>
          </SwiperSlide>
        ) : (
          <>{productImage}</>
        )}
        <div className={`absolute z-50 flex flex-col gap-1 top-2 right-2`}>
          {productGallery?.stickers?.length > 0 &&
            productGallery?.stickers?.map((sticker) => {
              return (
                <div
                  key={sticker?.id}
                  className={`text-[13px] bg-[#CA965C] px-[0.85rem] py-1 rounded-lg font-bold`}
                >
                  <span className={`text-[0.75rem] text-white`}>
                    {sticker?.name}
                  </span>
                </div>
              );
            })}
        </div>
      </Swiper>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        id={`thumbsSwiper`}
        slidesPerView={0}
        loop={true}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 0,
            thumbs: {
              enabled: false,
            },
            modules: [],
          },
          768: {
            direction: "vertical",
            slidesPerView: 4.25,
            enabled: true,
            loop: true,
            allowSlidePrev: true,
            modules: [FreeMode, Thumbs],
          },
        }}
        freeMode={true}
        className={`${classes.mySwiper} mySwiper max-md:hidden !relative`}
      >
        {" "}
        {thumbImage}
        <div
          className={`absolute ${
            productGallery?.gallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } bottom-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slideNext();
          }}
        >
          <i
            className={`fas fa-chevron-down`}
            onClick={() => {
              swiper?.slideNext();
            }}
          ></i>
        </div>
        <div
          className={`absolute ${
            productGallery?.gallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } top-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slidePrev();
          }}
        >
          <i
            className={`fas fa-chevron-up`}
            onClick={() => {
              swiper?.slidePrev();
            }}
          ></i>
        </div>
      </Swiper>
      {modalImage && (
        <div
          className={`fixed md:hidden top-0 left-0 w-full h-full bg-black/80 z-[999999] flex items-center justify-center`}
        >
          <div className="relative w-full h-full">
            <Swiper
              modules={[Pagination, Zoom]}
              pagination={true}
              direction={"vertical"}
              zoom={{
                maxRatio: 2.5,
                toggle: true,
                minRatio: 1,
              }}
              initialSlide={productGallery?.gallery?.findIndex(
                (item) => item?.image === modalImage
              )}
              className={`${classes.mySwiper2} modalSwiper swiper-zoom-container`}
              breakpoints={{
                0: {
                  direction: "vertical",
                  slidesPerView: 1,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    enabled: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                  },
                },
              }}
            >
              {productGallery?.gallery?.map((image, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="swiper-zoom-container">
                      <Image
                        src={image?.image}
                        alt={`Croonus Shop`}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                        className="cursor-pointer w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <i
            className={`fas fa-times absolute top-2 left-2 z-50 text-[#e10000] bg-white rounded-xl px-2 py-1 text-xl cursor-pointer`}
            onClick={() => {
              setModalImage(null);
            }}
          ></i>
        </div>
      )}
    </div>
  );
};
