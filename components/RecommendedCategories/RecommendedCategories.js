"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const RecommendedCategories = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.25rem] max-sm:mx-5 lg:mx-[5rem] md:mx-5 max-sm:mt-[3rem] md:mt-[5.625rem]">
      {categories?.map((category, index) => {
        return (
          <div className="col-span-1" key={index}>
            <div className="relative lg:h-[450px] 2xl:h-[500px] h-[350px]">
              {category?.images?.image && (
                <Image
                  src={category?.images?.image}
                  alt={category.slug}
                  fill
                  priority={true}
                  className="h-full bg-fixed max-xl:object-cover"
                />
              )}
              <Link href={`/${category?.link?.link_path}`}>
                <div className="absolute h-full  top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                  <div className="relative z-[53] ">
                    <h1 className="max-lg:text-[3.5rem] lg:text-[4rem] text-[5rem] 2xl:text-[8.5rem] font-light text-white uppercase">
                      {category?.basic_data?.name}
                    </h1>
                    <p className="sm:self-end max-sm:text-center max-sm:self-center sm:text-right text-white text-[1.5rem] md:-mt-8">
                      {category?.basic_data?.short_description}
                    </p>
                  </div>
                </div>
              </Link>
              <Link href={`/${category?.link?.link_path}`}>
                <div className="absolute transition-all duration-500 h-full w-full top-0 right-0 bottom-0 left-0 bg-transparent hover:bg-black hover:bg-opacity-30 z-[50]"></div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCategories;
