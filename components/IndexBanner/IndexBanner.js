"use client";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

const IndexBanner = ({ banner }) => {

  return (
    <div
      className="block max-sm:w-[95%] max-sm:mx-auto mx-[20px] max-sm:mt-[5rem] mt-[7.5rem] transition-all duration-500 "
    >
      <Link href={`${banner[0]?.url ?? "/stranica-u-izradi"}`}>
        <div className="relative max-sm:h-[400px] md:h-[630px]">
          <Image
            src={banner[0]?.image}
            alt={banner[0]?.title ?? ""}
            width={1920}
            height={1080}
            className="object-cover h-full w-full"
          />
          <div className="absolute z-10 flex flex-col items-center justify-center max-sm:gap-0 gap-10 top-[55%] text-center left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {banner[0]?.title && (
              <h1 className="text-white max-sm:text-[5rem] text-[8.875rem] font-light uppercase sm:leading-[4.625rem]">
                {banner[0]?.title}
              </h1>
            )}
            {banner[0]?.text && (
              <h1 className="text-white text-[1.438rem] font-light max-sm:self-center sm:self-end leading-[2.625rem]">
                {banner[0]?.text}
              </h1>
            )}
          </div>
          <div className="absolute h-full w-full top-0 left-0 hover:bg-black transition-all duration-500 hover:bg-opacity-30"></div>
        </div>
      </Link>
    </div>
  );
};

export default IndexBanner;
