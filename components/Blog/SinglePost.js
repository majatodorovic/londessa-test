"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper as Slider, SwiperSlide as Slide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const SinglePost = ({ post }) => {
  const [blogGallery, setBlogGallery] = useState([
    post?.images?.thumb_image,
    ...post?.gallery,
  ]);

  return (
    <div className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
      <Slider
        modules={[Navigation]}
        navigation
        className={`rounded-md blogSlider`}
        watchSlidesProgress
      >
        {blogGallery?.map((image, index) => {
          return (
            <Slide key={index} className={`rounded-md`}>
              <div
                className={`2xl:h-[500px] h-[250px] 3xl:h-[600px] relative rounded-md`}
              >
                <Image
                  src={image}
                  alt={post?.basic_data?.title}
                  width={0}
                  height={0}
                  sizes={`100vw`}
                  priority
                  className={`object-cover rounded-md w-full h-full bg-fixed`}
                />
              </div>
            </Slide>
          );
        })}
      </Slider>
      <section className={`flex flex-col gap-3 `}>
        <div className={`border-b py-5`}>
          <p className={`text-base font-normal`}>
            {post?.basic_data?.short_description}
          </p>
        </div>
        <div
          className={`text-base font-normal mt-5 prose !max-w-full prose-a:text-[#CA965C] font`}
          dangerouslySetInnerHTML={{ __html: post?.basic_data?.description }}
        />
      </section>
    </div>
  );
};

export default SinglePost;
