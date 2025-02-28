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

const ProductMobileGallery = ({
  productGallery,
  color,
  loading,
  setLoading,
  product,
}) => {
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
        className="h-full w-full aspect-2/3 object-cover"
        onClick={onClick}
      >
        <Image
          src={src}
          width={0}
          height={0}
          sizes={
            "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw, 20vw"
          }
          priority={true}
          className="!h-full !w-full !object-cover"
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
          alt={`Croonus`}
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
            backgroundColor: "white",
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
  const productImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className="w-full">
        <ImageMagnifier
          src={image?.image}
          width={2000}
          height={2000}
          onClick={() => {
            setModalImage(image?.image);
          }}
        />
      </SwiperSlide>
    );
  });
  const thumbImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <Image
          src={image?.image}
          alt={`Croonus`}
          width={2000}
          height={2000}
          priority={true}
          className="cursor-pointer max-md:hidden"
        />
      </SwiperSlide>
    );
  });

  const [newImage, setNewImage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (color) {
      const newImage = productGallery?.findIndex((item) =>
        item?.variant_key?.includes(color)
      );
      setNewImage(newImage);
      swiper?.slideTo(newImage);
    }
  }, [color]);

  useEffect(() => {
    if (productGallery?.length) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [productGallery]);
  return (
    <div className="col-span-4 max-md:h-[500px] md:flex md:flex-row-reverse gap-5 md:h-[650px] lg:h-[700px] xl:h-[780px] 2xl:h-[790px] 3xl:h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination, Navigation]}
        initialSlide={color ? newImage : 0}
        navigation={true}
        loop={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`${classes.mySwiper2} productDetailsSwiper`}
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
            <div className="h-full w-full bg-gray-200 animate-pulse"></div>
          </SwiperSlide>
        ) : (
          productImage
        )}
        {product?.data?.item?.price?.discount?.active && (
          <div
            className={`absolute right-2 top-2 z-[1] text-white text-[13px]`}
          >
            <div
              className={`bg-[#c23d27] px-[0.85rem] py-1 rounded-lg font-bold`}
            >
              -
              {(
                ((product?.data?.item?.price?.price?.original -
                  product?.data?.item?.price?.price?.discount) /
                  product?.data?.item?.price?.price?.original) *
                100
              ).toFixed(0)}
              %
            </div>
          </div>
        )}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
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
            productGallery?.length > swiper?.params?.slidesPerView
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
            productGallery?.length > swiper?.params?.slidesPerView
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
              initialSlide={productGallery?.findIndex(
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
              {productGallery?.map((image, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="swiper-zoom-container">
                      <Image
                        src={image?.image}
                        alt={`Croonus`}
                        layout="fill"
                        objectFit="contain"
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

export default ProductMobileGallery;
