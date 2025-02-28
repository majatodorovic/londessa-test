"use client";
import { list } from "@/app/api/api";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NewCategoriesSections = ({ categories }) => {
  return (
    <div className="mt-16 lg:mt-28 max-md:w-[95%] mx-auto md:w-full md:px-[3rem]">
      <h2 className="font-bold text-[25px] mb-7 text-[#171717]">
        Izdvojeno iz nove kolekcije
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-[1fr,2fr,1fr] gap-3">
        {categories?.slice(0, 5)?.map((category, index) => (
          <Link
            key={category.id}
            className={`${
              index === 1 ? "row-span-2 h-full" : ""
            } aspect-square relative w-full overflow-hidden`}
            href={`/${category?.link?.link_path}`}
          >
            {category?.images?.image && (
              <Image
                src={category?.images?.image}
                alt="category"
                fill
                className="object-cover hover:scale-110 transition-all duration-700 ease-in-out"
              />
            )}
            <div className="absolute bottom-0 left-0 w-full h-14 bg-black/40 z-10 flex items-center justify-center">
              <h3 className="text-white text-center text-[20px] md:text-[33px] font-light  uppercase">
                {category?.basic_data?.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewCategoriesSections;
