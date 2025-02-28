"use client";
import { Suspense, useState } from "react";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classes from "../RelatedProducts/RelatedProducts.module.css";
import { Thumb } from "../Thumb/Thumb";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { list } from "@/app/api/api";

const UpsellProducts = ({
  upsellProducts = [],
  loading,
  text = "Preporučujemo",
  api,
  path,
  id,
}) => {
  const { data } = useSuspenseQuery({
    queryKey: [id, api, text],
    queryFn: async () => {
      return await list(`${api}/${id}`).then((res) => res?.payload?.items);
    },
  });

  return (
    <>
      {data?.length > 0 && (
        <div className="max-sm:w-[95%] mt-[6rem] max-sm:mx-auto md:mx-[3rem] max-sm:mt-[3rem]  overflow-visible">
          <div className="flex justify-between w-full items-center">
            <h5 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
              {text}
            </h5>
          </div>
          <div className="max-sm:mt-[1rem] mt-[2.5rem]">
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
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1680: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {data?.map(({ id }) => {
                return (
                  <Suspense
                    fallback={
                      <SwiperSlide
                        key={id}
                        className="aspect-2/3 h-full w-full animate-pulse bg-slate-300"
                      />
                    }
                  >
                    <SwiperSlide key={id} className="hoveredColor">
                      <Thumb id={id} slug={id} />
                    </SwiperSlide>
                  </Suspense>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default UpsellProducts;
